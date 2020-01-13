let margin = {left:100, right:10, top:10, bottom:150};
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
        .paddingInner(0.3)
        .paddingOuter(0.3);
let y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return d.height;})])
        .range([height, 0]);

//creating axis
let xAxis = d3.axisBottom(x);
g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis)
    .selectAll("text")
        .attr("transform","rotate(-40)" )
        .attr("text-anchor", "end")
        .attr("x", "-5")
        .attr("y", "10");
let yAxis = d3.axisLeft(y)
                .ticks(3)
                .tickFormat(function(d){
                    return d + "m";
                });
g.append("g")
    .attr("class", "y axis")
    .call(yAxis);

//creating the labels
//x label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", width/2)
  .attr("y", height + 140)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("The world's tallest buildings")

//y label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x",-(height/2))
  .attr("y", -55)
  .attr("font-size", "20px")
  .attr("transform", "rotate(-90)")
  .text("Height (m)")

let rects = g.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("y", function(d){
                return y(d.height);
            })
            .attr("x", function(d){
                return x(d.name) ;
            })
            .attr("width", x.bandwidth())
            .attr("height", function(d){
                return height - y(d.height);
            })
            .attr("fill", function(d){
                return "grey";
            })

});