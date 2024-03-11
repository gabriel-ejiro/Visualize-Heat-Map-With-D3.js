// Fetch the data from the provided URL
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
    .then(response => response.json())
    .then(data => {
        // Process the data and create the heatmap visualization
    })
    .catch(error => console.error('Error fetching data:', error));

// Assuming you have an SVG container named 'svg' and your data is stored in the variable 'data'

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
