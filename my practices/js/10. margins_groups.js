/**
 * svg groups structure ELEMETNTS together on the page
 * transformation - alter svg's position
 * margin - give space for axes
 * GROUPS: 
 *  invisible containers for structuring svgs
 *  transaltion attributes - for moving multiple svgs at once
 */
//simple group example
// let margin = {top: 20 , right: 10, bottom: 20, left: 10};

// let width = 960 - margin.left - margin.right;
// let height = 500 - margin.top - margin.bottom;

// let group = d3.select("body").append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// example from band_scales
let margin = {left:100, right:10, top:10, bottom:100};
let width = 600 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

let svg = d3.select('#chart-area')
            .append('svg')
            .attr('height',height + margin.top + margin.bottom)
            .attr("width", width + margin.left + margin.right);

//creating group
let g = svg.append("g")
        .attr("transform", "translate(" + margin.left + ","
        + margin.top + ")")
d3.json("data/buildings.json").then(function(data){
    data.forEach(element => {
        element.height = +element.height;
    });

let x = d3.scaleBand()
        .domain(data.map(function(d){return d.name;}))
        .range([0, width])
        .paddingInner(0.5)
        .paddingOuter(0.3);
let y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return d.height;})])
        .range([0, height]);

let rects = g.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("y", 20)
            .attr("x", function(d){
                return x(d.name) ;
            })
            .attr("width", x.bandwidth())
            .attr("height", function(d){
                return y(d.height);
            })
            .attr("fill", function(d){
                return "grey";
            })

});