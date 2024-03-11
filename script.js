// Fetch the data from the provided URL
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
    .then(response => response.json())
    .then(data => {
        // Process the data and create the heatmap visualization
    })
    .catch(error => console.error('Error fetching data:', error));

// user story 3, 4, 5

// Define dimensions for your SVG container
const width = 800;
const height = 500;

// Append SVG container to the body
const svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create x-axis
const xAxis = d3.axisBottom(xScale)
  .ticks(10); // Adjust the number of ticks as needed

// Append x-axis to the SVG
svg.append("g")
  .attr("id", "x-axis")
  .attr("transform", `translate(0, ${height - margin.bottom})`) // Adjust positioning as needed
  .call(xAxis);

// Create y-axis
const yAxis = d3.axisLeft(yScale)
  .ticks(10); // Adjust the number of ticks as needed

// Append y-axis to the SVG
svg.append("g")
  .attr("id", "y-axis")
  .attr("transform", `translate(${margin.left}, 0)`) // Adjust positioning as needed
  .call(yAxis);

// Create cells (rect elements) to represent the data
svg.selectAll(".cell")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "cell")
  .attr("x", (d) => xScale(d.xValue)) // Adjust x-coordinate based on data
  .attr("y", (d) => yScale(d.yValue)) // Adjust y-coordinate based on data
  .attr("width", cellWidth) // Define width of each cell
  .attr("height", cellHeight) // Define height of each cell
  .style("fill", (d) => colorScale(d.value)); // Fill color based on data


// user story 6, 7, 8

// Define scales and colors
// Replace these with your actual scales and colors
const colorScale = d3.scaleSequential()
  .domain([0, d3.max(data, d => d.value)])
  .interpolator(d3.interpolateViridis);

// Create cells (rect elements) to represent the data
svg.selectAll(".cell")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "cell")
  .attr("x", (d) => xScale(d.xValue)) // Adjust x-coordinate based on data
  .attr("y", (d) => yScale(d.yValue)) // Adjust y-coordinate based on data
  .attr("width", cellWidth) // Define width of each cell
  .attr("height", cellHeight) // Define height of each cell
  .style("fill", (d) => colorScale(d.value)) // Fill color based on data
  .attr("data-month", (d) => d.month) // Add data-month property
  .attr("data-year", (d) => d.year) // Add data-year property
  .attr("data-temp", (d) => d.value); // Add data-temp property

// user story 9, 10, 11
// Define y-axis scale and axis generator
const yScale = d3.scaleBand()
  .domain(months.map(d => d.month)) // Assuming 'months' is an array containing month names
  .range([0, height - margin.bottom]); // Adjust range as needed

const yAxis = d3.axisLeft(yScale)
  .tickFormat(d => months.find(month => month.month === d).name); // Format ticks with full month name

// Append y-axis to the SVG
svg.append("g")
  .attr("id", "y-axis")
  .attr("transform", `translate(${margin.left}, 0)`) // Adjust positioning as needed
  .call(yAxis);

// Define x-axis scale and axis generator
const xScale = d3.scaleBand()
  .domain(years) // Assuming 'years' is an array containing all years
  .range([margin.left, width - margin.right]); // Adjust range as needed

const xAxis = d3.axisBottom(xScale);

// Append x-axis to the SVG
svg.append("g")
  .attr("id", "x-axis")
  .attr("transform", `translate(0, ${height - margin.bottom})`) // Adjust positioning as needed
  .call(xAxis);

// user story 12, 13, 14
// Define x-axis scale and axis generator
const xScale = d3.scaleBand()
  .domain(years) // Assuming 'years' is an array containing all years
  .range([margin.left, width - margin.right]); // Adjust range as needed

const xAxis = d3.axisBottom(xScale)
  .tickValues(years.filter(year => year % 10 === 0)); // Display tick labels for every 10 years

// Append x-axis to the SVG
svg.append("g")
  .attr("id", "x-axis")
  .attr("transform", `translate(0, ${height - margin.bottom})`) // Adjust positioning as needed
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-0.8em")
  .attr("dy", "0.15em")
  .attr("transform", "rotate(-65)");

// Create legend
const legend = svg.append("g")
  .attr("id", "legend")
  .attr("transform", `translate(${width - 120}, ${margin.top})`); // Adjust positioning as needed

// Define legend data and colors
const legendData = ["< 2.8", "2.8 - 3.9", "3.9 - 5.0", ">= 5.0"];
const legendColors = ["#ffffcc", "#c2e699", "#78c679", "#238443"];

// Append rect elements to the legend
legend.selectAll(".legend-item")
  .data(legendData)
  .enter()
  .append("rect")
  .attr("class", "legend-item")
  .attr("x", 0)
  .attr("y", (d, i) => i * 20)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", (d, i) => legendColors[i]);

// Add text labels to the legend
legend.selectAll("text")
  .data(legendData)
  .enter()
  .append("text")
  .attr("x", 24)
  .attr("y", (d, i) => i * 20 + 9)
  .attr("dy", "0.35em")
  .text(d => d);


// user story 15, 16, 17
// Define the tooltip
const tooltip = d3.select("body").append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);

// Append rect elements to the legend with at least 4 different fill colors
const legendColors = ["#ffffcc", "#c2e699", "#78c679", "#238443", "#004529"]; // Add more colors as needed
legend.selectAll(".legend-item")
  .data(legendData)
  .enter()
  .append("rect")
  .attr("class", "legend-item")
  .attr("x", 0)
  .attr("y", (d, i) => i * 20)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", (d, i) => legendColors[i]);

// Add mouseover event listeners to cells for tooltip display
svg.selectAll(".cell")
  .on("mouseover", (event, d) => {
    tooltip.transition()
      .duration(200)
      .style("opacity", 0.9);
    tooltip.html(`Year: ${d.year}<br>Month: ${d.month}<br>Temperature: ${d.value.toFixed(2)}`)
      .attr("data-year", d.year)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", () => {
    tooltip.transition()
      .duration(500)
      .style("opacity", 0);
  });

