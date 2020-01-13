//scatter plot made from previous bar chart
let margin = {left: 100, right: 10, top: 10, bottom: 100};
let width = 600 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;
let flag = true;

let t = d3.transition().duration(750);

let svg = d3.select("#chart-area")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

let g = svg.append("g")
            .attr("transform", "translate("+ margin.left + "," + margin.top + ")");

let x = d3.scaleBand()
        .range([0, width])
        .paddingInner(0.2)
        .paddingOuter(0.3);

let y = d3.scaleLinear()
            .range([height, 0]);

//x axis
let xAxis_group = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")");

//x label
g.append("text")
    .attr("class", "x axis-label")
    .text("Month")
    // .attr("font-size", "20px")
    .attr("x", width/2)
    .attr("y", height + 50)
    .attr("text-anchor", "middle");

// y axis
let yAxis_group = g.append("g")
    .attr("class", "y axis");

//y label
let yLabel = g.append("text")
    .attr("class", "y axis-label")
    .text("Revenue")
    .attr("x", -(height/2))
    .attr("y", -(margin.left - 45))
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle");

d3.json("data/revenues.json").then(function(data){
    // console.log(data);
    //converts strings to integer
    data.forEach(element => {
        element.revenue = +element.revenue;
        element.profit = +element.profit;
    });
    //interval
    d3.interval(function(){
        var newData = flag ? data : data.slice(1);
        update(newData);
        flag = !flag;
    }, 1000)
    update(data)
});

function update(data){
//if flag true => revenue , else => profit
    let value = flag ? "revenue" : "profit"; 
    x.domain(data.map(function(d){ return d.month;}));
    
    y.domain([0, d3.max(data, function(d){ return d[value] ;})]);

    let xAxis = d3.axisBottom(x);
    xAxis_group.transition(t)
                .call(xAxis);

    let yAxis = d3.axisLeft(y)
                    .ticks(5)
                    .tickFormat(function(d){
                        return d + "$";
                    });
    yAxis_group.transition(t)
                .call(yAxis);


    //JOIN new data with old elements
    let scatter = g.selectAll("circle")
                .data(data, function(d){
                    return d.month;
                });

    //EXIT old elements not present in new data
    scatter.exit()
        .attr("fill", "red")
    .transition(t)
        .attr("cy", y(0))
        .attr("height", 0)
        .remove();

    //ENTER new elements present in new data    
    scatter.enter()
        .append("circle")        
            .attr("cx", function(d){
                return x(d.month) + x.bandwidth() / 2;
            })       
            .attr("fill", "grey")
            .attr("cy", y(0))
            .attr("r", 5)
            .merge(scatter)
            .transition(t)
                .attr("cx", function(d){
                    return x(d.month) + x.bandwidth() / 2;
                })
                .attr("cy", function(d){
                    return y(d[value]);
                });
        
    let label = flag ? "Revenue" : "Profit"
    yLabel.text(label)

}