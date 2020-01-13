let svg = d3.select("#chart-area")
            .append("svg")
            .attr("width", "400px")
            .attr("height", "400px");

let circle = svg.append("circle")
                .attr('cx', 200)
                .attr("cy", 200)
                .attr("r", 100)
                .style("fill", "red")

            