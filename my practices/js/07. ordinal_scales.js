/**
 * ordinal scale used for coloring categorical data
 */
let color = d3.scaleOrdinal()
            .domain(["Dhaka", "Barisal", "Naogaon", "Munshiganj", 
            "Gazipur", "Bogra"])
            .range(["red", "grey", "blue", "yellow", "indigo", "green", 
            "orange"]);

console.log(color("Dhaka"))

let color_chromatic = d3.scaleOrdinal()
                .domain(["Dhaka", "Barisal", "Naogaon", "Munshiganj", 
                "Gazipur", "Bogra"])
                .range(d3.schemeCategory10);

console.log(color_chromatic("Dhaka"))