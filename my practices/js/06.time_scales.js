/**
 * time scales takes jS data objects as domain
 */

 let time_Scale = d3.scaleTime()
                    .domain([new Date(2000,0,1),
                    new Date(2001, 0, 1)])
                    .range([0, 400]);

console.log(time_Scale(new Date(2000, 7, 1)));
console.log(time_Scale(new Date(2000, 2, 1)));
console.log(time_Scale(new Date(2000, 10, 25)));

console.log(time_Scale.invert(232.8));
console.log(time_Scale.invert(66.5));
console.log(time_Scale.invert(360));
