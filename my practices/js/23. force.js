/** Adapted from Mike Bostock at bl.ocks.org
    https://bl.ocks.org/mbostock/4062045

    three step process
    step 1 : initialize the force simulation
    step 2 : add force functions to the system
    step 3: create a callback function to update SVG positions after every "tick"
*/

/**
 * d3 force functions
 * forceCenter (for setting the center of gravity of the system)
 * forceManyBody (for making elements atract or repel one another)
 * forceCollide (for preventing elements overlapping)
 * forceX and forceY (for attracting elements to a given point)
 * forceLink (for creating a fixed distance between connected elements)
 */
let width = 600;
let height = 600;
let svg = d3.select("#chart-area")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

let color = d3.scaleOrdinal(d3.schemeSet2);

//add forces to the simulation
let simulation = d3.forceSimulation()
                    .force("center", d3.forceCenter(width/2, height/2))
                    .force("charge", d3.forceManyBody().strength(-50))
                    .force("collide", d3.forceCollide(10).strength(0.9))
                    .force("link", d3.forceLink().id(function(d){ return d.id ;}));

d3.json("data/force.json").then(function(graph){
    console.log(graph);

    //add lines for every link in the dataset
    let link = svg.append("g")
                  .attr("class", "links")
                  .selectAll("line")
                  .data(graph.links)
                  .enter()
                  .append("line")
                  .attr("stoke-width", function(d){
                      return Math.sqrt(d.value);
                  });

    //add circles for every node in the dataset
    let node = svg.append("g")
                  .attr("class", "nodes")
                  .selectAll("circle")
                  .data(graph.nodes)
                  .enter()
                  .append("circle")
                  .attr("r", 5)
                  .attr("fill", function(d){
                      return color(d.group);
                  })
                  .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended)
                  );

    //basic tooltip
    node.append("title")
        .text(function(d){
            return d.id ;
        });

    //attach nodes to the simulation, add listener on the "tick" event
    simulation.nodes(graph.nodes)
              .on("tick", ticked);

    //associate the lines with the "link" force
    simulation.force("link")
              .links(graph.links);

    //dynamically update the position of the nodes/links as the time passes
    function ticked(){
        link
            .attr("x1", function(d){ return d.source.x;})
            .attr("x2", function(d){ return d.target.x;})
            .attr("y1", function(d){ return d.source.y;})
            .attr("y2", function(d){ return d.target.y;})

        node
            .attr("cx", function(d){ return d.x ;})
            .attr("cy", function(d){ return d.y;})
    }
});

//change the value of alpha, so things move around when we drag a node
function dragstarted(d){
    //  console.log(d.fx);
    if(!d3.event.active){
        simulation.alphaTarget(0.7).restart();
    }
    d.fx = d.x;
    dxfy = d.y;
    
}

//fix the position of the node that we are looking at
function dragged(d){
    // console.log(d);
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

//let the node do what it wants again once we've looked at it
function dragended(d){
    // console.log(d);
    d.fx = null;
    d.fy = null;
}