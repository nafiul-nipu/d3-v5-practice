//domain is range of  the input
//range is the range of the output

// let y = d3.scaleLinear()
//         .domain([0,848])
//         .range([0,400]);

// console.log(y(100));
// console.log(y(400));
// console.log(y(700));

// console.log(y.invert(40));
// console.log(y.invert(200));
// console.log(y.invert(340));

let svg = d3.select('#chart-area')
            .append('svg')
            .attr('height', "400")
            .attr("width", "400");

d3.json("data/buildings.json").then(function(data){
    data.forEach(element => {
        element.height = +element.height;
    });
let y = d3.scaleLinear()
        .domain([0, 828])
        .range([0, 400]);

let rects = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("y", 20)
            .attr("x", function(d,i){
                return i * 60 ;
            })
            .attr("width", 40)
            .attr("height", function(d){
                return y(d.height);
            })
            .attr("fill", function(d){
                return "grey";
            })

});