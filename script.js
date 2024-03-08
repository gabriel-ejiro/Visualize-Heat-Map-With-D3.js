// Fetch the data from the provided URL
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
    .then(response => response.json())
    .then(data => {
        // Process the data and create the heatmap visualization
    })
    .catch(error => console.error('Error fetching data:', error));
