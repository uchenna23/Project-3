// load json data
d3.json("/clean_data/cleaned_medal_total.json").then((data) => {
    // calculate the size of the object (# of rows)
  
    let country_arr = [];
    let rank_arr = [];
    let gold_arr = [];
    let silver_arr = [];
    let bronze_arr = [];
    let total_arr = [];

    for (let key=0; key<10; key++) {
      country_arr.push(data[key].Country);
      rank_arr.push(data[key].Rank);
      gold_arr.push(data[key].Gold);
      silver_arr.push(data[key].Silver);
      bronze_arr.push(data[key].Bronze);
      total_arr.push(data[key].Total);
    };

    console.log(country_arr);

    var trace_gold = {
        x: gold_arr,
        y: country_arr,
        name: 'Gold Medals',
        type: 'bar',
        orientation: "h",
        marker: {color: 'rgb(255, 215, 0)'}
      };
      
      var trace_silver = {
        x: silver_arr,
        y: country_arr,
        name: 'Silver Medals',
        type: 'bar',
        orientation: "h",
        marker: {color: 'rgb(192, 192, 192)'}
      };

      var trace_bronze = {
        x: bronze_arr,
        y: country_arr,
        name: 'Bronze',
        type: 'bar',
        orientation: "h",
        marker: {color: 'rgb(205, 127, 50)'}
      };
      
      var data = [trace_bronze, trace_silver, trace_gold];
      
      var layout = {
          barmode: 'stack',
          title: "Top 10 Countries with the Most Olympic Medals",
          yaxis: {
              autorange: "reversed",
              labelAutoFit: true},
        margin: { t: 70, l: 180 }
        };
      
      Plotly.newPlot('Medal_Stacked', data, layout);

});