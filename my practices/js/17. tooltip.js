//step 1 initializing the tooltip
let tip = d3.tip()
            .attr('class', 'd3-tip')
            .html(function(d){
                return d;
            });

//callling the tip in the visualization
//let we have a visualization called svg
svg.call(tip)

//adding event listeners
svg.selecAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr('x', 10)
    .attr('y', 10)
    .on('mouseover', tip.show) //showing the tip
    .on('mouseout', tip.hide) //hiding the tip