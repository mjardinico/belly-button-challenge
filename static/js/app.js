// const url = "../samples.json";
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    // console.log(data);
    // Let's process the data for get the top 10 otu_ids
    let samples = data.samples;
    let sampleValues = samples.map(d=> d.sample_values);
    let otuIds = samples.map(d=> d.otu_ids);
    let otuLabels = samples.map(d => d.otu_labels);

    // Let's use slice to get the top 10
    let topSampleValues = sampleValues[0].slice(0, 10);
    let topOtuIds = otuIds[0].slice(0, 10).map(id => `OTU ${id}`);
    let topOtuLabels = otuLabels[0].slice(0, 10);

    // Let's create the trace
    let trace = {
      x: topSampleValues,
      y: topOtuIds,
      text: topOtuLabels,
      type: 'bar',
      orientation: 'h'
    };

    // Create the layout
    let layout = {
      title: 'Top 10 OTU',
      xaxis: { title: 'Sample Values'},
      yaxis: { title: 'OTU IDs'},
      width: 400,
      height: 500
    };

    // Create the Plotly bar chart
    Plotly.newPlot('bar', [trace], layout);

});

// Trave the OTU