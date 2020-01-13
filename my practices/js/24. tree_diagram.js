/**
 * Adapted from Mike Bostock at bl.ocks.org
https://bl.ocks.org/mbostock/4339184
 */

let width = 960;
let height = 1000;
let svg = d3.select("#chart-area")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

let g = svg.append("g")
            .attr("transform", "translate(40, 0)");

let tree = d3.tree()
             .size([height, width - 160]);

let stratify = d3.stratify()
                 .parentId(function(d){
                     return d.id.substring(0, d.id.lastIndexOf("."));
                 });

d3.csv("data/tree.csv").then(function(data){
    let root = stratify(data)
                .sort(function(a,b){
                    return (a.height - b.height) || a.id.localeCompare(b.id);
                });

    //add the links (given by calling tree(root), which also adds positional x/y coordinates) for the nodes
    let link = g.selectAll(".link")
                .data(tree(root).links())
                .enter()
                .append("path")
                .attr("d", d3.linkHorizontal()
                             .x(function(d){ return d.y ;})
                             .y(function(d) { return d.x;})
                    );

    //add groups for each node in the hierarchy with circles and text labels
    let node = g.selectAll(".node")
                .data(root.descendants())
                .enter()
                .append("g")
                .attr("class", function(d){
                    return "node" + (d.children ? "node--internal" : "node--leaf");
                })
                .attr("transform", function(d){
                    return "translate(" + d.y + "," + d.x + ")";
                });

    node.append("circle")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", 3)
        .attr("x", function(d){
            return d.children ? -8 : 8 ;
        })
        .style("text-anchor", function(d){
            return d.children ? "end" : "start";
        })
        .text(function(d){
            return d.id.substring(d.id.lastIndexOf(".") + 1);
        });
});