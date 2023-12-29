##  Module 14 Challenge
* Project Name: Module 14 Challenge (Belly Button Biodiversity Analysis)
* Submitted by: Michael Jardinico
* Date submitted: 12/25/2023

### Project Overview
`Welcome to the Belly Button Biodiversity Dashboard project! In this assignment, we will create an interactive dashboard to explore the fascinating world of microbes that colonize human navels. The dataset reveals that a small handful of these microbial species, also known as operational taxonomic units (OTUs), and provides insights into their prevalence among different individuals.`

### Working Files (starter code)
1. index.html
2. app.js
3. samples.json (use only as reference). Refer to the URL provide for the actual dataset 

### Instructions
1. Use the D3 library to read the `samples.json` from the following URL:
   "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

2. Create a horizontal bar chart with a dropdown to display the top 10 OTUs found in that individual
    - Use `sample_values` as the values for the bar chart.
    - Use `otu_ids` as the labels for the bar chart.
    - Use `otu_lables` as the hovertext for the chart

    <!-- Add an image here -->
    ![horizontal bar chart](https://github.com/mjardinico/belly-button-challenge/blob/main/Resources/bar-chart.png)

3. Create a bubble chart that displays each sample.
    - Use `out_ids` for the x values.
    - Use `sampl_values` for the y values.
    - Use `sample_values` for the marker size.
    - Use `otu_ids` for the marker colors.
    - Use `otu_labels` for the text values.

    <!-- Add an image here -->
    ![bubble chart](https://github.com/mjardinico/belly-button-challenge/blob/main/Resources/bubble-chart.png)

4. Display the sample metadata, i.e. an indivual's demographic. Display each key-value of the `metadata` information from the JSON object (`sample.json`):

    <!-- Add an image here -->
    ![demographic info widget](https://github.com/mjardinico/belly-button-challenge/blob/main/Resources/drop-down-demographic-info.png)

5. Update the plots when a new sample is selected:

    <!-- Add an image here -->
    <!-- ![Belly Button Biodiversity Dashboard](https://github.com.png) -->

6. Deploy the app to a free static page hosting service, such as GitHub pages. 

    <!-- Provide a link to the webpage here -->


<!-- `Verified Results`
- [subject1](https://github.com/mjardinico/.png)
- [subject2](https://github.com/mjardinico/.png)
- [subject3](https://github.com/mjardinico/.png) -->