

const standingUrl = "http://127.0.0.1:5000/api/v1.0/standings";
const goalUrl = "http://127.0.0.1:5000/api/v1.0/goals";
let standingData;
let goalData;
let yearGoals = [];
var colors = [
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
// Fetch the JSON data for standings
d3.json(standingUrl).then(function (data) {
  standingData = data;
  filterpostion1data();
});
// Fetch the JSON data for goals
d3.json(goalUrl).then(function (data) {
  goalData = data;
  tournamentData();
  matchesinYear();
});

//Filtering position 1 data from 'filterdata'
function filterpostion1data() {
  let filterdata = standingData.filter(x => x.position === 1);
  countriesDict = [];
  result = filterdata.reduce(function (r, a) {
    r[a.team_name] = r[a.team_name] || [];
    r[a.team_name].push(a);
    return r;
  }, Object.create(null));
  for (x in result) {
    var newCountry = {};
    newCountry.country = x;
    newCountry.count = result[x].length;
    countriesDict.push(newCountry);
  }
  plotPieChart(countriesDict);

}

//Function to create Pie Chart for the top countries
function plotPieChart(countriesDetails) {
  var xValues = [];
  var yValues = [];
  for (x in countriesDetails) {
    xValues.push(countriesDetails[x].country);
    yValues.push(countriesDetails[x].count)
  }

  new Chart("myChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: colors,
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

//Tournaments group by year
function groupbyYear(){
  let tournament = goalData;
  var tornbyYear = tournament.reduce(function (res, obj) {

    if (!(obj.tournament_id in res))
      res.__array.push(res[obj.tournament_id] = obj);
    else {
      res[obj.tournament_id].home_team += obj.home_team;
      res[obj.tournament_id].away_team += obj.away_team;
    }
    return res;
  }, { __array: [] }).__array
    .sort(function (a, b) { return b.away_team - a.away_team; });
  //Creating a list of dictionaries containing year and number goals in the year
  
  tornbyYear.forEach(x => {
    var newYear = {};
    newYear.year = x.tournament_id;
    newYear.goalsPerYear = x.home_team + x.away_team;
    yearGoals.push(newYear);
  });
  //Sorting based on Tournament Id (Removing the string part of tournament id)
  yearGoals.sort(function (a, b) {
    return (a.year).split("-")[1] - (b.year).split("-")[1];
  })
  return yearGoals;
}

//Groupby data with respect to year
function tournamentData() {
  let yearGoals = groupbyYear();
  plotBarYear(yearGoals);
}


//Plotting the barchart by year
function plotBarYear(yearDetails) {
  var xValues = [];
  var yValues = [];
  for (x in yearDetails) {
    xValues.push(yearDetails[x].year);
    yValues.push(yearDetails[x].goalsPerYear)
  }

  new Chart("barChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: colors,
        data: yValues
      }]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Goals Scored"
      }
    }
  });

}


// Average number of goals per each match in each world cup
function matchesinYear() {
  goalData.sort(function (a, b) {
    return (a.key_id - b.key_id);
  })

  let matchCount = [];
  for (let i = 0; i < goalData.length - 1; i++) {
    if (goalData[i].tournament_id != goalData[i + 1].tournament_id) {
      var tourn = {};
      tourn.year = goalData[i].tournament_id;
      tourn.matches = parseInt(goalData[i].match_id.split("-")[2]);
      matchCount.push(tourn);
    }
  }
  let last = {};
  last.year = goalData[goalData.length - 1].tournament_id;
  last.matches = parseInt(goalData[goalData.length - 1].match_id.split("-")[2]);
  matchCount.push(last);

  plotAvgBar(matchCount,yearGoals);
}

//Plotting the barchart by year
function plotAvgBar(mc,yg) {
  var xValues = [];
  var yValues = [];
  for (x in mc,yg) {
    xValues.push(mc[x].year);
    yValues.push(yg[x].goalsPerYear/mc[x].matches)
    //yValues.push(mc[x].matches)
  }
   

  new Chart("AvgChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: colors,
        borderColor: colors[0],
        data: yValues
      }]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Average Goals Scored"
      }
    }
  });

}