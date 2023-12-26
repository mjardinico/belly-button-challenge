// // BAR CHART
// // const url = "../samples.json";
// const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// //Fetch the JSON data and create arrays
// d3.json(url).then(function(data) {
//   let samples = data.samples[0]; // Assuming we are working with the first sample

//   // Combine the data into an array of objects
//   let combinedData = samples.sample_values.map((value, index) => ({
//       sampleValue: value,
//       otuId: `OTU ${samples.otu_ids[index]}`,
//       otuId2: samples.otu_ids[index],
//       otuLabel: samples.otu_labels[index]
//   }));

//   // Sort by sampleValue in descending order and then take the top 10
//   combinedData.sort((a, b) => b.sampleValue - a.sampleValue);
//   let topData = combinedData.slice(0, 10);

//   // Reverse the topData
//   topData.reverse();

//   // console.log(topData);

//   // Separate the sorted data into their respective arrays
//   let topSampleValues = topData.map(d => d.sampleValue);
//   let topOtuIds = topData.map(d => d.otuId);
//   let topOtuLabels = topData.map(d => d.otuLabel);


//     // Create the trace 
//     let trace = {
//       x: topSampleValues,
//       y: topOtuIds,
//       text: topOtuLabels,
//       type: 'bar',
//       orientation: 'h'
//     };

//     // Create the layout
//     let layout = {
//       margin: {
//         l: 120,
//         r: 20,
//         b: 50,
//         t: 0
//       },
//       width: 400,
//       height: 400
//     };

//     // Create the Plotly bar chart
//     Plotly.newPlot('bar', [trace], layout);

//     // Start code for the Bubble chart
//     // Create separate arrays sorted data into their respective arrays
//     let allSampleValues = combinedData.map(d => d.sampleValue);
//     let allOtuIds = combinedData.map(d => d.otuId2);
//     let allOtuLabels = combinedData.map(d => d.otuLabel);


//     let trace2 = {
//       x: allOtuIds,
//       y: allSampleValues,
//       text: allOtuLabels,
//       mode: 'markers',
//       marker: {
//         size: allSampleValues,
//         color: allOtuIds,
//         colorscale: 'Earth'
//       }
//     }

//     let layout2 = {
//       // title: 'Bubble Chart',
//       showlegend: false,
//       height: 500,
//       width: 1000,
//       xaxis: {
//         title: 'OTU ID'
//       },
//     }

//     // Create the Plotly Bubble chart
//     Plotly.newPlot('bubble', [trace2], layout2);

//     // Select the dropdown element
//     let dropdown = d3.select("#selDataset");

//     // Populate the dropdown with otu_ids
//     data.samples.forEach(sample => {
//       dropdown.append("option").text(sample.id).property("value".sample.id);
//     });

//     // Create event listener for the dropdown change
//     dropdown.on("change", dropdownChange);

//     function dropdownChange() {
//       let newSampleId = d3.select(this).property('value');
//       // Now you can use newSampleId to update your charts
//       // For example, you might have a function like this:
//       updateCharts(newSampleId);
//     }
  
//     function updateCharts(sampleId) {
//       // Code to update charts based on the selected sample ID
//       // This is where you'd re-run the logic similar to what you have above,
//       // but using the data for the selected sample ID instead of the first sample
//       // Find the selected sample from the dataset
//       const selectedSample = data.samples.find(sample => sample.id === sampleId);

//       if (!selectedSample) {
//         console.error('Selected sample not found.');
//         return;
//       }

//       // Process the new data 
//       let combinedData = selectedSample.sample_values.map((value, index) => ({
//         sampleValue: value,
//         otuId: `OTU ${selectedSample.otu_ids[index]}`,
//         otuId2: selectedSample.otu_ids[index],
//         otuLabel: selectedSample.otu_labels[index]
//       }));

//       combinedData.sort((a, b) => b.sampleValue - a.sampleValue);

//       // For Bar Chart
//       let topData = combinedData.slice(0, 10).reverse();
//       let topSampleValues = topData.map(d => d.sampleValue);
//       let topOtuIds = topData.map(d => d.otuId);
//       let topOtuLabels = topData.map(d => d.otuLabel);

//       let barTrace = {
//         x: topSampleValues,
//         y: topOtuIds,
//         text: topOtuLabels,
//         type: 'bar',
//         orientation: 'h'
//       };

//       Plotly.newPlot('bar', [barTrace], layout);

//       // For Bubble Chart
//       let allSampleValues = combinedData.map(d => d.sampleValue);
//       let allOtuIds = combinedData.map(d => d.otuId2);
//       let allOtuLabels = combinedData.map(d => d.otuLabel);

//       let bubbleTrace = {
//         x: allOtuIds,
//         y: allSampleValues,
//         text: allOtuLabels,
//         mode: 'markers',
//         marker: {
//           size: allSampleValues,
//           color: allOtuIds,
//           colorscale: 'Earth'
//         }
//       };

//       Plotly.newPlot('bubble', [bubbleTrace], layout2);
//     }

  
//     }
  
//     // Initial rendering of the charts
//     updateCharts(data.samples[0].id);


// });



// REV 2 OF CODE
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data
d3.json(url).then(function(data) {
  initializeDropdown(data.samples);
  updateCharts(data.samples[0].id, data.samples);

  // Populate the dropdown with otu_ids
  function initializeDropdown(samples) {
    let dropdown = d3.select("#selDataset");
    samples.forEach(sample => {
      dropdown.append("option")
              .text(sample.id)
              .property("value", sample.id);
    });

    // Event listener for the dropdown change
    dropdown.on("change", function() {
      updateCharts(d3.select(this).property('value'), samples);
      console.log(dropdown.property('value'));
    });

  }

  function updateCharts(sampleId, samples) {
    const selectedSample = samples.find(sample => sample.id === sampleId);

    // if (!selectedSample) {
    //   console.error('Selected sample not found.');
    //   return;
    // }

    const combinedData = processData(selectedSample);
    renderBarChart(combinedData);
    renderBubbleChart(combinedData);

    // Update the metadata display
    updateMetadataDisplay(sampleId, samples);
  }

  function processData(sample) {
    let combinedData = sample.sample_values.map((value, index) => ({
      sampleValue: value,
      otuId: `OTU ${sample.otu_ids[index]}`,
      otuId2: sample.otu_ids[index],
      otuLabel: sample.otu_labels[index]
    }));
    combinedData.sort((a, b) => b.sampleValue - a.sampleValue);
    return combinedData;
  }

  function renderBarChart(combinedData) {
    let topData = combinedData.slice(0, 10).reverse();
    let trace = {
      x: topData.map(d => d.sampleValue),
      y: topData.map(d => d.otuId),
      text: topData.map(d => d.otuLabel),
      type: 'bar',
      orientation: 'h'
    };
    let layout = {
      margin: { l: 120, r: 20, b: 50, t: 0 },
      width: 400,
      height: 400
    };
    Plotly.newPlot('bar', [trace], layout);
  }

  function renderBubbleChart(combinedData) {
    let trace = {
      x: combinedData.map(d => d.otuId2),
      y: combinedData.map(d => d.sampleValue),
      text: combinedData.map(d => d.otuLabel),
      mode: 'markers',
      marker: {
        size: combinedData.map(d => d.sampleValue),
        color: combinedData.map(d => d.otuId2),
        colorscale: 'Earth'
      }
    };
    let layout = {
      showlegend: false,
      height: 500,
      width: 1000,
      xaxis: { title: 'OTU ID' }
    };
    Plotly.newPlot('bubble', [trace], layout);
  }

  function updateMetadataDisplay(sampleId, data) {
    let metadata = data.metadata.find(d => d.id.toString() === sampleId);
  
    if (!metadata) {
      console.error('Metadata for the selected sample not found.');
      return;
    }
  
    let metadataContainer = d3.select("#sample-metadata");
    metadataContainer.html(""); // Clear existing metadata
  
    Object.entries(metadata).forEach(([key, value]) => {
      metadataContainer.append("p").text(`${key}: ${value}`);
    });
  }

});

