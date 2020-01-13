//domain - min: 300 , max: 150,000
//range min: 0, max : 400
//can give a base value (i.e. default) means how much equally spaced
//for 10 -> 500-5000-50000
//for 2 -> 500, 1000, 2000
//domain needs to be all positive or all negative
/*
input/domain ----- output/range
500         ------      32.9
5000           -----    181.1
50,000      -------     329.3

*/

let x = d3.scaleLog()
        .domain([300, 150000])
        .range([0, 400])
        .base(10);

console.log(x(500))
console.log(x(5000))
console.log(x(50000))

console.log(x.invert(32.9))
console.log(x.invert(181.1))
console.log(x.invert(329.3))