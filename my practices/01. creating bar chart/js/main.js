/*
*   bar chart
*/
d3.json("data/revenues.json").then(function(data){
    // console.log(data);
    //converts strings to integer
    data.forEach(element => {
        element.revenue = +element.revenue;
    });
    // console.log(data);
    let margin = {left: 100, right: 10, top: 10, bottom: 100};
    let width = 600 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;

    let svg = d3.select("#chart-area")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

    let g = svg.append("g")
                .attr("transform", "translate("+ margin.left + "," + margin.top + ")");
    
    let x = d3.scaleBand()
            .domain(data.map(function(d){
                return d.month;
            }))
            .range([0, width])
            .paddingInner(0.2)
            .paddingOuter(0.3);
    let y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d){ return d.revenue ;})])
                .range([height, 0]);

    //x axis
    let xAxis = d3.axisBottom(x)

    g.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(0, " + height + ")")
        .selectAll("text")
            .attr("text-anchor", "middle")
            .attr("fill", "red");

    //x label
    g.append("text")
        .attr("class", "x axis-label")
        .text("Month")
        // .attr("font-size", "20px")
        .attr("x", width/2)
        .attr("y", height + 50)
        .attr("text-anchor", "middle");

// y axis
    let yAxis = d3.axisLeft(y)
                    .ticks(5)
                    .tickFormat(function(d){
                        return d + "$";
                    });
    
    g.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    //y label
    g.append("text")
        .attr("class", "y axis-label")
        .text("Revenue (dollar)")
        .attr("x", -(height/2))
        .attr("y", -(margin.left - 45))
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle");
    
    let bar = g.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("y", function(d){
                    return y(d.revenue);
                })
                .attr("x", function(d){
                    return x(d.month);
                })
                .attr("width", x.bandwidth())
                .attr("height", function(d){
                    return height - y(d.revenue)
                })
                .style("fill", "grey");


});