/**
 * section 7
 * 01. Using the D3 community
 * bl.ocks.org
 * blockbuilder.org
 * 
 * stacked chart
 * Adapted from Mike Bostock at bl.ocks.org
  https://bl.ocks.org/mbostock/3885211

  Adapted from Maggie Lee at bl.ocks.org
  https://bl.ocks.org/greencracker/e08d5e789737e91d6e73d7dcc34969bf

  for grouping data
  d3.nest()

pie and donut chart
Adapted from Mike Bostock at bl.ocks.org
    https://bl.ocks.org/mbostock/3887235

Adapted from Mike Bostock at bl.ocks.org
    https://bl.ocks.org/mbostock/5682158

wordcloud
 Adapted from Yi Du at blockbuilder.org
    http://blockbuilder.org/abrahamdu/e1481e86dd4e9d553cc2d7d359b91e68

    section 8
    world Map
    Adapted from Mike Bostock at bl.ocks.org
    https://bl.ocks.org/mbostock/3734333

    choropleth map
    Adapted from Mike Bostock at bl.ocks.org
    https://bl.ocks.org/mbostock/4060606

    node-link diagram
     Adapted from Mike Bostock at bl.ocks.org
    https://bl.ocks.org/mbostock/4062045
 */

 //promises
 var buildings, example;
 var promises = [
     d3.json("data/buildings.json"),
     d3.json("data/example.json")
 ];
 

 Promise.all(promises).then(function(alldata){
     buildings = alldata[0];
     example = alldata[1];
 });

 buildings.forEach(function(d){
     console.log(d);
 });