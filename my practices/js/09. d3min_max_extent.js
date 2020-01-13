let temp_data = [
    {grade: "A", value: 4},
    {grade: "B", value: 3},
    {grade:"C", value: 2}
]

//d3.min()
let min = d3.min(temp_data, function(d){
    return d.value;
});
console.log(min); //2

//d3.max()
let max = d3.max(temp_data, function(d){
    return d.value;
});
console.log(max); //4

//d3.extent()
let extent = d3.extent(temp_data, function(d){
    return d.value;
});
console.log(extent); //[2, 4]

//map function
let map = temp_data.map(function(d){
    return d.grade;
});
console.log(map); //["A", "B", "C"]

//use this in scaleLiner() and scaleBand()
let y_min_max = d3.scaleLinear()
                .domain([d3.min(temp_data, function(d){return d.value;}),
                d3.max(temp_data, function(d){return d.value;})])
                .range([0,400]);

let y_extent = d3.scaleLinear()
                .domain(d3.extent(temp_data, function(d){return d.value;}))
                .range([0, 400]);

let x_map = d3.scaleBand()
                .domain(temp_data.map(function(d){return d.grade;}))
                .range([0, 400])
                .paddingInner(0.3)
                .paddingOuter(0.2);