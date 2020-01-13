/*
*   bar chart
*/
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
    let bar = g.selectAll("rect")
                .data(data, function(d){
                    return d.month;
                });

    //EXIT old elements not present in new data
    bar.exit()
        .attr("fill", "red")
    .transition(t)
        .attr("y", y(0))
        .attr("height", 0)
        .remove();

    // //UPDATE old elements present in new data
    // bar.attr("y", function(d){
    //         return y(d[value]);
    //     })
    //     .attr("x", function(d){
    //         return x(d.month);
    //     })
    //     .attr("width", x.bandwidth())
    //     .attr("height", function(d){
    //         return height - y(d[value])
    //     });

    //ENTER new elements present in new data    
    bar.enter()
        .append("rect")        
            .attr("x", function(d){
                return x(d.month);
            })
            .attr("width", x.bandwidth())        
            .attr("fill", "grey")
            .attr("y", y(0))
            .attr("height", 0)
            .merge(bar)
            .transition(t)
                .attr("x", function(d){
                    return x(d.month);
                })
                .attr("width", x.bandwidth())
                .attr("y", function(d){
                    return y(d[value]);
                })
                .attr("height", function(d){
                    return height - y(d[value])
                });
        
    let label = flag ? "Revenue" : "Profit"
    yLabel.text(label)

}

/**
 * d3 update pattern
 * 
 * //data join 
 * //join new data with old elements, if any  
 * let text = g.selectAll("text")
 *              .data(data);
 * 
 * //EXit
 * //remove old elements as needed  
 * text.exit().remove();
 * 
 * //UPDATE
 * //update old elements as needed
 * text.attr("class", "update")
 *     .attr("fill", "red");
 * 
 * //ENTER
 * //create new elements as needed
 * text.enter().append("text")
 *      .attr("class", "enter")
 *      .attr("x", function(d,i){ return i * 32 ;})
 *      .attr("y", 20)
 *      .attr("fill", "green");
 */