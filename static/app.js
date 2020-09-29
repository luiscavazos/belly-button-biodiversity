function makePlots(id) {

d3.json("static/samples.json").then(data => {
    console.log(data)})
    var id = data.samples.otu_id;
    var values = data.samples.sample_values;
    var sortvalues = values.sort((a, b) => b - a);
    var finalvalues = sortvalues.slice(0,10).reverse()
    var labels = data.samples.otu_labels;
    var sortlabels = labels.sort((a, b) => b - a);
    var finallabels = sortlabels.slice(0,10).reverse()
    var trace = {
        x : finalvalues,
        y : id,
        text: finallabels,
        marker : {
            color: "blue"},
            type: "bar",
            orientation : "h",
        };
        var bar = [trace];
        var layout = {
            title: "Top 10 OTU",
            yaxis: {
                tickmode:"linear",
            },
            margin: { 
                l:100,
                r:100,
                t:100,
                b:30
            }
        }
        Plotly.newPlot("bar", bar, layout);
    };



function optionChanged(id) {
    makePlots(id)
}





function init() {
    var drop = d3.select("#selDataset");
    d3.json("static/samples.json").then((data) =>{
        console.log(data)
        data.names.forEach( x => {
            drop.append("option").text(x).property("value");
            
        });
        makePlots(data.names[0])
    })
}

init();