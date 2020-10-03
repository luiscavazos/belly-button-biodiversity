function makePlots(sample) {

d3.json("static/samples.json").then(data => {
    var resultsarray= data.samples.filter(x => x.id == sample);
    var result = resultsarray[0]
    var ids = result.otu_id;
    var labels = result.otu_labels;
    var values = result.sample_values;
    
    var LayoutBubble = {
        margin: {t:0},
        xaxis: {title : "Id's" },
        hovermode: "closest"
    };
        var DataBubble = [{
            x : ids,
            y: values,
            text : labels,
            mode : "markers",
            marker: {
                color:ids,
                size: values,
            }
        }];

    Plotly.plot("bubble", DataBubble, LayoutBubble);   
    
    var bar_data = [
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
    Plotly.newPlot("bar", bar_data, barlayout)
});

function buildMetadata(sample) {
    d3.json("static/samples.json").then(data => {
        console.log(data);
        var metadata= data.metadata;
        var resultsarray = metadata.filter(d => d.id == sample);
        var result = resultarray[0]
        var Panel = d3.select("#sample-metadata");
        Panel.html("");
        Object.defineProperties(result).forEach(([key,value])=> {
            Panel.append("h6").text(`${key}: ${value}`);
        });

    
    })
}
}
    //var id = data.samples.otu_id;
    //var values = data.samples.sample_values;
   // var sortvalues = values.sort((a, b) => b - a);
    //var finalvalues = sortvalues.slice(0,10).reverse()
    //var labels = data.samples.otu_labels;
    //var sortlabels = labels.sort((a, b) => b - a);
   // var finallabels = sortlabels.slice(0,10).reverse()
   // var trace = {
     //   x : finalvalues,
     //   y : id,
     //   text: finallabels,
     //   marker : {
     //       color: "blue"},
     //       type: "bar",
     //       orientation : "h",
     //   };
     //   var data1 = [trace];
        //var layout = {
          //  title: "Top 10 OTU",
          //  yaxis: {
          //      tickmode:"linear",
          //  },
          //  margin: { 
          //      l:100,
          //      r:100,
          //      t:100,
          //      b:30
          //  }
        //}



function init() {
    var drop = d3.select("#selDataset");
    d3.json("static/samples.json").then((data) =>{
       sampleNames= data.names;
       sampleNames.forEach( sample => {
            drop.append("option").text(sample).property("value", sample);
            
        });
        makePlots(sampleNames[0]);
        buildMetadata(sampleNames[0]);
    })
}

function optionChanged(newSample) {
    makePlots(newSample);
    buildMetadata(newSample);
}

init();