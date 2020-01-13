/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/
let time = 0;
let margin = {left: 100, right: 10, top: 10, bottom: 100};
let width = 800 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

let svg = d3.select("#chart-area")
			.append("svg")
			.attr("viewBox", "0 0 " + (width + margin.left + margin.right) +" " + (height + margin.top + margin.bottom) + " "); //min-x , min -y , width , height
			// .attr("width", width + margin.left + margin.right)
			// .attr("height", height + margin.top + margin.bottom);

let g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let x = d3.scaleLog()
		  .domain([142, 150000])
		  .range([0, width])
		  .base(10);

let y = d3.scaleLinear()
		.domain([0, 90])
		.range([height, 0]);

let area = d3.scaleLinear()
			 .domain([2000, 1400000000])
			 .range([25 * Math.PI , 1500 * Math.PI]);

let color = d3.scaleOrdinal(d3.schemePastel1);
// console.log(color("africa"))

let xAxis = d3.axisBottom(x)
			  .tickValues([400, 4000, 40000])
			  .tickFormat(d3.format("$"));

let xAxis_group = g.append("g")
					.attr("class", "x axis")
					.call(xAxis)
					.attr("transform", "translate(0, " + height + ")");

let xLabel = g.append("g")
			  .append("text")
			  .attr("class", "x label")
			  .text("GDP Per Capita ($)")
			  .attr("font-size", "20px")
			  .attr("text-anchor", "middle")
			  .attr("x", width / 2)
			  .attr("y", height + 40);
			  
let yAxis = d3.axisLeft(y)
			.tickFormat(function(d){
				return +d ;
			});

let yAxis_group = g.append("g")
					.attr("class", "y axis")
					.call(yAxis)

let yLabel = g.append("g")
			  .append("text")
			  .attr("class", "y label")
			  .text("Life Expentency (Years)")
			  .attr("transform", "rotate(-90)")
			  .attr("text-anchor", "middle")
			  .attr("x", -(height/2))
			  .attr("y", -30)
			  .attr("font-size", "20px");

let timeLabel = g.append("g")
				 .append("text")
				 .text("1800")
				 .attr("font-size", "40px")
				 .attr("text-anchor", "middle")
				 .attr("x", width - 4 * margin.right)
				 .attr("y", height - margin.top);

//adding legend 
let legend = g.append("g")
			  .attr("transform", "translate(" + (width - 10)
			  + "," + (height - 125) + ")");

let continents = ["europe", "asia", "america", "africa"];
continents.forEach(function(continent, i){
	let legendRow = legend.append("g")
						  .attr("transform", "translate(0, " + 
						  (i * 20) + ")");

	legendRow.append("rect")
			 .attr("width", 10)
			 .attr("height", 10)
			 .attr("fill", color(continent));

	legendRow.append('text')
		  .attr('x', -10)
		  .attr('y', 10)
		  .attr('text-anchor', 'end')
		  .style('text-transform', 'capitalize')
		  .text(continent);
});
d3.json("data/data.json").then(function(data){
	// console.log(data)
	const filtered_data = data.map(function(d){
		let filtered = d["countries"].filter(function(country){
			if(country.income && country.life_exp){
				return country;
			}
		});
		filtered.map(function(filter){
			filter.income = +filter.income;
			filter.life_exp = +filter.life_exp;	
			filter.population = +filter.population;		
			return filter;
		});
		// console.log(filtered)
		return filtered;
	});
	// console.log(filtered_data[0].continent)

	d3.interval(function(){
		//loop back
		time = (time < 214) ? time + 1 : 0
		update(filtered_data[time]);
	}, 200);
	update(filtered_data[0]);
});

function update(filtered_data){
	let transition_time = d3.transition()
							.duration(200)
							.ease(d3.easeLinear);
	// JOIN new data with old elements.
	//create the view - selectall to data
	let bubble = g.selectAll('circle')
				  .data(filtered_data);
	// EXIT old elements not present in new data.
	bubble.exit()
		  .remove();
	// ENTER new elements present in new data. -- enter to all
	bubble.enter()
		.append("circle")
		.attr("class", "circle")		
		.attr("fill", function(d){
			//   console.log(d.continent)
			//   console.log(color(d.continent));
				return color(d.continent)
		})
		.merge(bubble)
		.transition(transition_time)
			.attr("cx", function(d){
				return x(d.income);
			})
			.attr("cy", function(d){
				return y(d.life_exp);
			})
			.attr("r", function(d){
				return Math.sqrt(area(d.population) / Math.PI);
			});	

	//update timeLabel
	timeLabel.text(+(time + 1800))
}