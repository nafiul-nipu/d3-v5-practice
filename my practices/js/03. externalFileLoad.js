d3.json("data/buildings.json").then(function(data){
    console.log(data)
    //convert value to integar
    data.forEach(element => {
        element.height = +element.height;
    });
    console.log(data)

    let svg = d3.select("#chart-area")
            .append("svg")
            .attr("height", 400)
            .attr("width", 400);

    let circle = svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d, i){
                        return d.height;
                    })
                    .attr("cy", function(d, i){
                        return d.height;
                    })
                    .attr("r", function(d, i){
                        return i + 5;
                    })
                    .style("fill", function(d){
                        if(d.name == "Burj Khalifa"){
                            return "blue";
                        }else{
                            return "red";
                        }
                    });

});