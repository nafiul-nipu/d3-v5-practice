const data = [10, 20, 30, 40];

let svg = d3.select("#chart-area")
            .append("svg")
            .attr("height", 400)
            .attr("width", 400);

let circle = svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d, i){
                    return d + d;
                })
                .attr("cy", function(d, i){
                    return d + d;
                })
                .attr("r", function(d, i){
                    return i + 5;
                })
                .style("fill", "red");