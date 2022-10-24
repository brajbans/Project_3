

const standingUrl = "http://127.0.0.1:5000/api/v1.0/standings";
const goalUrl = "http://127.0.0.1:5000/api/v1.0/goals";
let standingData;
let goalData;

// Fetch the JSON data 
d3.json(standingUrl).then(function (data) {
    standingData = data;
    filterpostion1data();
});

d3.json(goalUrl).then(function (data) {
    goalData = data;
});

function filterpostion1data(){
    let filterdata = standingData.filter(x => x.position === 1);
    countriesDict = [];
    result = filterdata.reduce(function (r, a) {
        r[a.team_name] = r[a.team_name] || [];
        r[a.team_name].push(a);
        return r;
    }, Object.create(null));
    for(x in result){
        var newCountry = {};
        newCountry.country = x;
        newCountry.count= result[x].length;
        countriesDict.push(newCountry);
    }
    plotPieChart(countriesDict);
}

function plotPieChart(countriesDetails){
    var xValues= [];
    var yValues = [];
    for(x in countriesDetails){
        xValues.push(countriesDetails[x].country);
        yValues.push(countriesDetails[x].count)
    }
    var barColors = [
      "#b91d47",
      "#00aba9",
      "#2b5797",
      "#e8c3b9",
      "#1e7145",
      "#0074D9", 
      "#FF4136", 
      "#2ECC40", 
      "#FF851B"
    ];
    
    new Chart("myChart", {
      type: "pie",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        title: {
          display: true,
          text: "World Cup Count"
        }
      }
    });
    
}

