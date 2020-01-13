/**
 * line graph
 */

d3.json("data/example.json").then(function(data){
    //time parser
    let parseTime = d3.timeParse("%Y");
    data.forEach(element => {
        // console.log(element)
        element.year = parseTime(element.year);
        element.value = +element.value;

    });
    let margin = {left: 80, right:20, top: 10, bottom:100};
    let width = 800 - margin.right - margin.left;
    let height = 500 - margin.top - margin.bottom;

    let svg = d3.select("#chart-area")
                .append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom);

    let g = svg.append("g")
            .attr("transform", "translate(" + margin.left + ","+ margin.top + ")");


    let x = d3.scaleTime()
            .range([0, width])
            .domain(d3.extent(data, function(d){ return d.year}));

    let y = d3.scaleLinear()
            .range([height, 0])
            .domain([d3.min(data, function(d) { return d.value; }) / 1.005, d3.max(data, function(d){return d.value}) * 1.005]);

    let xAxisCall = d3.axisBottom(x);

    let yAxisCall = d3.axisLeft(y)
                    .ticks(6)
                    .tickFormat(function(d){
                        return parseInt(d / 1000) + "k"
                    });

    let xAxis = g.append("g")
                .attr("class", "x axis")
                .call(xAxisCall)
                .attr("transform", "translate(0," + height + ")")
                .style("text-anchor", "middle")

    let yAxis = g.append("g")
                  .attr("class", "y axis")
                  .call(yAxisCall);
    
    let yLabel = g.append("text")
                   .text("Population")
                   .attr("transform", "rotate(-90)")
                   .style("text-anchor", "end")
                   .attr("fill", "#5D6971")
                   .attr("y", 6)
                   .attr("dy", ".71em");

    let line = d3.line()
                 .x(function(d){ 
                    //  console.log(x(d.year));
                     return x(d.year)})
                 .y(function(d) {
                     console.log(y(d.value))
                     return y(d.value)});

    let line_chart = g.append("g")
                      .append("path")
                      .attr("class", "line")
                      .attr("d", line(data))
                      .attr("fill", "none")
                      .attr("stroke", "grey")
                      .attr("stroke-width", "3px")

//     //tooltip code
//     let bisectDate = d3.bisector(function(d){
//         return d.year;
//     }).left;

//     var focus = g.append("g")
//     .attr("class", "focus")
//     .style("display", "none");

// focus.append("line")
//     .attr("class", "x-hover-line hover-line")
//     .attr("y1", 0)
//     .attr("y2", height);

// focus.append("line")
//     .attr("class", "y-hover-line hover-line")
//     .attr("x1", 0)
//     .attr("x2", width);

// focus.append("circle")
//     .attr("r", 7.5);

// focus.append("text")
//     .attr("x", 15)
//     .attr("dy", ".31em");

// g.append("rect")
//     .attr("class", "overlay")
//     .attr("width", width)
//     .attr("height", height)
//     .on("mouseover", function() { focus.style("display", null); })
//     .on("mouseout", function() { focus.style("display", "none"); })
//     .on("mousemove", mousemove);

// function mousemove() {
//     var x0 = x.invert(d3.mouse(this)[0]),
//         i = bisectDate(data, x0, 1),
//         d0 = data[i - 1],
//         d1 = data[i],
//         d = x0 - d0.year > d1.year - x0 ? d1 : d0;
//     focus.attr("transform", "translate(" + x(d.year) + "," + y(d.value) + ")");
//     focus.select("text").text(d.value);
//     focus.select(".x-hover-line").attr("y2", height - y(d.value));
//     focus.select(".y-hover-line").attr("x2", -x(d.year));
// }
});

