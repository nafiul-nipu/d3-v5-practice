//d3.format()
//https://github.com/d3/d3-format
/**
 * d3.format(".0%")(0.123);  // rounded percentage, "12%"
d3.format("($.2f")(-3.5); // localized fixed-point currency, "(£3.50)"
d3.format("+20")(42);     // space-filled and signed, "                 +42"
d3.format(".^20")(42);    // dot-filled and centered, ".........42........."
d3.format(".2s")(42e6);   // SI-prefix with two significant digits, "42M"
d3.format("#x")(48879);   // prefixed lowercase hexadecimal, "0xbeef"
d3.format(",.2r")(4223);  // grouped thousands with two significant digits, "4,200"
 */

let formatter = d3.format(".2f")
formatter(1000) //1000.00
formatter(5.248) //5.25

//for time format - d3.timFormat() or d3.timeParse()
//https://github.com/d3/d3-time-format
//time formatting
let formatTime = d3.timeFormat("%B %d, %Y")
formatTime(new Date); //"Jan 10, 2020"

//parsing
let parseTime = d3.timeParse("%B %d, %Y")
parseTime("June 30, 2015") // Tue Jun 30 2015 00:00:00 GMT-0700 (PDT)