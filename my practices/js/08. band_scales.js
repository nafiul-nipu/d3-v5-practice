/**
 * band scales distributes the range equally
 * domain - strings
 * range - max, min , PaddingInner, PaddingOuter
 * PaddingInner = 0 -> no space between the bars
 * PaddingOuter = 0 -> no space between the first and last bars
 */
/** 
let band_example = d3.scaleBand()
                    .domain(["AFRICA", "N. America", "Europe", 
                    "S. America"])
                    .range([0, 400])
                    .paddingInner(0.3)
                    .paddingOuter(0.2);
console.log(band_example("S. America"));
console.log(band_example.bandwidth()); ==> can be used for rect width
*/
let svg = d3.select('#chart-area')
            .append('svg')
            .attr('height', "400")
            .attr("width", "400");

d3.json("data/buildings.json").then(function(data){
    data.forEach(element => {
        element.height = +element.height;
    });

let x = d3.scaleBand()
        .domain(data.map(function(d){return d.name;}))
        .range([0, 400])
        .paddingInner(0.5)
        .paddingOuter(0.3);
let y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return d.height;})])
        .range([0, 400]);

let rects = svg.selectAll("rect")
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