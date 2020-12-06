let readings = 0
let elec = 0
let stddev = 0
OLED.init(128, 64)
OLED.writeStringNewLine("Please place your fingers on the sensor")
basic.pause(2000)
let std = Math.sqrt(stddev / 30)
let list: number[] = []
for (let index = 0; index < 30; index++) {
    elec += pins.analogReadPin(AnalogPin.P1)
    basic.pause(1000)
    list.push(pins.analogReadPin(AnalogPin.P1))
}
let average = Math.idiv(elec, 30)
for (let value3 of list) {
    stddev += value3 - average * (value3 - average)
}
OLED.writeStringNewLine("average is:")
OLED.writeNumNewLine(Math.sqrt(stddev / 30))
basic.forever(function () {
    readings = 0
    for (let index = 0; index < 5; index++) {
        readings += pins.analogReadPin(AnalogPin.P1)
        basic.pause(500)
    }
    if (Math.idiv(readings, 5) >= average + std) {
        OLED.writeStringNewLine("reading above threshold")
        OLED.writeNumNewLine(Math.idiv(readings, 5))
        basic.showIcon(IconNames.No)
        basic.pause(1000)
        basic.clearScreen()
    } else {
        OLED.writeNumNewLine(Math.idiv(readings, 5))
        basic.showIcon(IconNames.Yes)
        basic.pause(1000)
        basic.clearScreen()
    }
})
