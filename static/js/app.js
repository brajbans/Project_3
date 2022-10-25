

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
    tournamentData();
    
});

//Filtering position 1 data from 'filterdata'
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

//Function to create Pie Chart for the top countries
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

//Groupby data with respect to year
function tournamentData() {
    let tournament = goalData;
  
    var groupbyYear = tournament.reduce(function(res, obj) {
        if (!(obj.tournament_id in res))
            res.__array.push(res[obj.tournament_id] = obj);
        else {
            res[obj.tournament_id].home_team += obj.home_team;
            res[obj.tournament_id].away_team += obj.away_team;
        }
        return res;
    }, {__array:[]}).__array
    .sort(function(a,b) { return b.away_team - a.away_team; });
   //Creating a list of dictionaries containing year and number goals in the year
    let yearGoals = [];
    groupbyYear.forEach(x => {
        var newYear = {};
        newYear.year = x.tournament_id;
        newYear.goalsPerYear = x.home_team + x.away_team;
        yearGoals.push(newYear);
    });
    //Sorting based on Tournament Id (Removing the string part of tournament id)
    yearGoals.sort(function(a,b){
      return (a.year).split("-")[1] - (b.year).split("-")[1];
    })
    plotBarYear(yearGoals);
  }


  //Plotting the barchart by year
  function plotBarYear(yearDetails){
      var xValues= [];
      var yValues = [];
      for(x in yearDetails){
          xValues.push(yearDetails[x].year);
          yValues.push(yearDetails[x].goalsPerYear)
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
        "#FF851B",
        "#b91d47",
        "#00aba9",
        "#2b5797",
        "#e8c3b9",
        "#1e7145",
        "#0074D9", 
        "#FF4136", 
        "#2ECC40", 
        "#FF851B",
        "#b91d47",
        "#00aba9",
        "#2b5797"
      ];
      
      new Chart("barChart", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          legend: {display: false},
          title: {
            display: true,
            text: "Goals Scored"
          }
        }
      });
      
    }