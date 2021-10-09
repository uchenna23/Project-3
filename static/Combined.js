// load json data
d3.json("/clean_data/cleaned_athletes.json").then((data) => {
  // calculate the size of the object (# of rows)
  
  var config = {responsive: true}

  let size = 0;

  for (key in data) {
    if (data.hasOwnProperty(key)) size++;
  }

  // get unique country names

  let all_country = [];

  for (key in data) {
    all_country.push(data[key].country);
  }

  function removeDuplicates(all_country) {
    return [...new Set(all_country)];
  }

  all_country = removeDuplicates(all_country).sort();

  // Create country dropdown selction

  var select = document.getElementById("selectCountry");

  for (let i = 0; i < all_country.length; i++) {
    var opt = all_country[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }

  const updateChart = (country) => {
    // declare female and male count and start at 0
    let female = 0;
    let male = 0;

    if (!country) {
      for (let i = 0; i < size; i++) {
        if (data[i].gender === "Female") {
          female++;
        } else if (data[i].gender === "Male") {
          male++;
        } else {
        }
      }
    } else {
      for (let i = 0; i < size; i++) {
        if (data[i].gender === "Female" && data[i].country === country) {
          female++;
        } else if (data[i].gender === "Male" && data[i].country === country) {
          male++;
        } else {
        }
      }
    }

    // plot the pie chart

    let trace1 = {
      values: [female, male],
      labels: ["Female", "Male"],
      type: "pie",
      textinfo: "value+percent",
    };

    let chart_data = [trace1];

    let layout = {
      title: "Participation by Gender",
      height: 600,
      width: 800,
      xaxis: { autorange: true},
      yaxis: { autorange: true},
    };

    Plotly.newPlot("plot", chart_data, layout, config);
   
    // get unique discipline

    let all_discipline = [];

    for (key in data) {
        if (!country) {
          all_discipline.push(data[key].discipline);
        } else {
          if (data[key].country === country) {
            all_discipline.push(data[key].discipline);
          }
        }
    };

    function removeDuplicates(all_discipline) {
        return [...new Set(all_discipline)];
    };

    all_discipline = removeDuplicates(all_discipline).sort();

    let discipline_count = [];

    for ( let i = 0; i < all_discipline.length; i++ ) {
      let selected_discipline = all_discipline[i];

      let number = 0

        for (key in data) {
          if (!country && data[key].discipline === selected_discipline) {
            number++;
          } else {
            if (data[key].country === country && data[key].discipline === selected_discipline) {
              number++;
            }
          }
        };

        discipline_count[i] = {
          "discipline": selected_discipline,
          "count": number
        };

    };

    console.log(all_discipline);

    console.log(country);

    console.log(discipline_count);

    const topN = (arr, n) => {
        if (n > arr.length){
            return false;
        }
        return arr
        .slice()
        .sort((a,b) => {
            return b.count - a.count
        })
        .slice(0, n);
    };

    maxN = Math.min(discipline_count.length, 10)

    console.log(`maxN is ${maxN}`)

    top_list = topN(discipline_count, maxN)

    console.log(top_list);

    var x = []
    var y = []

    let extractColumn = (arr, column) => arr.map(x=>x[column]);

    y = extractColumn(top_list, "count")
    x = extractColumn(top_list, "discipline")

    var trace2 = {
        x: y,
        y: x,
        text: x,
        type: "bar",
        orientation: "h",
    };

    var data2 = [trace2];

    var bar_title = `Top ${maxN} Most Popular Sport Disciplines`

    var layout2 = {
        title: bar_title,
        xaxis: { autorange: true},
        yaxis: { autorange: "reversed", padding: 100},
        margin: { t: 70, l: 100 },
        height: 380,
    };

    Plotly.newPlot("bar", data2, layout2, config);
  
  };

  updateChart("");

  select.addEventListener("change", (ev) => {
    const country = ev.target.value;
    updateChart(country);
  });

});