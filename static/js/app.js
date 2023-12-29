//REV 4 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data
d3.json(url).then(function(data) {
  const metadata = data.metadata;

  initializeSamplesDropdown(data.samples);
  updateCharts(data.samples[0].id, data.samples);
  updateDisplay(metadata, 940);

  // Initialize the dropdown for samples
  function initializeSamplesDropdown(samples) {
    let dropdown = d3.select("#selDataset");
    samples.forEach(sample => {
      dropdown.append("option")
              .text(sample.id)
              .property("value", sample.id);
    });

    // Event listener for the dropdown change
    dropdown.on("change", function() {
      const selectedId = d3.select(this).property('value');
      updateCharts(selectedId, samples);
      updateDisplay(metadata, selectedId);
    });
  }

  // Function to update the display
  function updateDisplay(metadata, selectedId) {
    const selectedMetadata = metadata.find(item => item.id == parseInt(selectedId));
    const container = d3.select("#sample-metadata");
    container.html("");

    container.append("p").text(`ID: ${selectedMetadata.id}`);
    container.append("p").text(`Ethnicity: ${selectedMetadata.ethnicity}`);
    container.append("p").text(`Gender: ${selectedMetadata.gender}`);
    container.append("p").text(`Age: ${selectedMetadata.age}`);
    container.append("p").text(`Location: ${selectedMetadata.location}`);
    container.append("p").text(`BBType: ${selectedMetadata.bbtype}`);
    container.append("p").text(`WFreq: ${selectedMetadata.wfreq}`);

    //Update gauge value
    updateGauge(selectedMetadata.wfreq);
  }

  function updateCharts(sampleId, samples) {
    const selectedSample = samples.find(sample => sample.id === sampleId);
    const combinedData = processData(selectedSample);
    renderBarChart(combinedData);
    renderBubbleChart(combinedData);
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

  function updateGauge(wfreq) {
  var dataIndicator = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: { 
        text: "<b>Belly Button Washing Frequency</b><br><sub style='font-size: 12px;'>Scubs per week</sub></b>", 
        font: {size: 18} 
      },
      type: "indicator",
      mode: "gauge+number"
    }
  ];
  
  var layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', dataIndicator, layout);
  
  }
});