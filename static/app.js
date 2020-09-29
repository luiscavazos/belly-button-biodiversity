//function makePlots(id) {

//d3.json("static/samples.json").then(data => {
  //  console.log(data)})
  //  var id = data.samples.otu_id;
  //  var values = data.samples.sample_values;
  //  var sortvalues = values.sort((a, b) => b - a);
  //  var finalvalues = sortvalues.slice(0,10).reverse()
  //  var labels = data.samples.otu_labels;









function init() {
    var drop = d3.select("#selDataset");
    d3.json("static/samples.json").then((data) =>{
        console.log(data)
        data.names.forEach( x => {
            drop.append("option").text(x).property("value");
            
        });
    })
}

init();