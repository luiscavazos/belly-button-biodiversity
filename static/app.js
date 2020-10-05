function Plots(sample) {

d3.json("static/samples.json").then(data => {
    var array= data.samples.filter(x => x.id == sample);
    var result = array[0]
    var ids = result.otu_id;
    var labels = result.otu_labels;
    var values = result.sample_values;
    
    var Bubblelayout = {
        margin: {t:0},
        xaxis: {title : "Id's" },
        hovermode: "closest"
    };
        var Bubbledata = [{
            x : ids,
            y: values,
            text : labels,
            mode : "markers",
            marker: {
                color:ids,
                size: values,
            }
        }];

    Plotly.plot("bubble", Bubbledata, Bubblelayout);   
    
    var bardata = [
        {
            y: ids.slice(0,10).map(otuID =>`OTU ${otuID})`).reverse(),
            x: values.slice(0,10).reverse(),
            text: labels.slice(0,10).reverse(),
            type: "bar",
            orientation:"h"
        }
    ]
    var barlayout = {
        title:"Top 10 Bacteria Cultures Found",
        margin: { t:30, l: 150}
    };
    Plotly.newPlot("bar", bardata, barlayout)
})};

function Metadata(sample) {
    d3.json("static/samples.json").then(data => {
        console.log(data);
        var metadata= data.metadata;
        var array = metadata.filter(d => d.id == sample);
        var result = array[0]
        var Panel = d3.select("#sample-metadata");
        Panel.html("");
        Object.defineProperties(result).forEach(([key,value])=> {
            Panel.append("h6").text(`${key}: ${value}`);
        });

    
    })
}


function init() {
    var drop = d3.select("#selDataset");
    d3.json("static/samples.json").then((data) =>{
       sampleNames= data.names;
       sampleNames.forEach( sample => {
            drop.append("option").text(sample).property("value", sample);
            
        });
        Plots(sampleNames[0]);
        Metadata(sampleNames[0]);
    })
}

function optionChanged(newSample) {
    Plots(newSample);
    Metadata(newSample);
}

init();