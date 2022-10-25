
const goalUrl = "http://127.0.0.1:5000/api/v1.0/goals";
const standingUrl = "http://127.0.0.1:5000/api/v1.0/standings";

let standingData;
let goalData;
let tournamentId = [];
// Fetch the JSON data 
d3.json(goalUrl).then(function (data) {
    addingDropdownMenu(data);
    goalData = data;
});

d3.json(standingUrl).then(function (data) {
    standingData = data;
});


// Adding Dropdown Menu
function addingDropdownMenu(data) {
    data.forEach(x => {
        tournamentId.push(x['tournament_id']);
    });

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    uniqueIds = tournamentId.filter(onlyUnique).sort();
    let dropdownMenu = d3.select("#selDataset");
    dropdownMenu.append('option').text('select');
    uniqueIds.forEach(element => {
        var options = dropdownMenu.append('option').text(element);
    });

}

//Determining the country standings
function standings(id){
    let tournament = standingData.filter(x => x.tournament_id === id);
    let winner = tournament.filter(x => x.position == 1)[0].team_name;
    let runner = tournament.filter(x => x.position == 2)[0].team_name;
    let third = tournament.filter(x => x.position == 3)[0].team_name;
    let fourth = tournament.filter(x => x.position == 4)[0].team_name;

    d3.select(".winner")
            .text("Winner: " + winner);
    
    d3.select(".runner")
            .text("Runner: " + runner);

    d3.select(".third")
            .text("Third Place: " + third);
    
    d3.select(".fourth")
            .text("Fourth Place: " + fourth);

}

//Plotting  Bar chart based on the selected year
function tournamentData(id) {
    let tournament = goalData.filter(x => x.tournament_id === id);

    var groupbyCountry = tournament.reduce(function(res, obj) {
        if (!(obj.team_name in res))
            res.__array.push(res[obj.team_name] = obj);
        else {
            res[obj.team_name].home_team += obj.home_team;
            res[obj.team_name].away_team += obj.away_team;
        }
        return res;
    }, {__array:[]}).__array
    .sort(function(a,b) { return b.away_team - a.away_team; });
   //Creating a list of dictionaries with country name and number of goals for the selected year
    let countryGoals = [];
    groupbyCountry.forEach(x => {
        var newCountry = {};
        newCountry.country = x.team_name;
        newCountry.goalsPerCountry = x.home_team + x.away_team;
        countryGoals.push(newCountry);
    });
    plotBar(countryGoals);
    plotBubble(countryGoals);
}

//Plotting bar chart using plotly
function plotBar(cg){
    var xValues= [];
    var yValues = [];
    for(x in cg){
        xValues.push(cg[x].country);
        yValues.push(cg[x].goalsPerCountry)
    }
    
    let data_plot = [{
        x: xValues,
        y: yValues,
        type: "bar",
        orientation: 'v',
        marker: {
            color: yValues,
        }
        
    }];

    let layout = {
        title: 'Number of Goals Per Each Country'
    }

    Plotly.newPlot("bar", data_plot, layout);
}

//Plotting bubble chart using plotly
function plotBubble(cg){
    var xValues= [];
    var yValues = [];
    var sizes = [];
    for(x in cg){
        xValues.push(cg[x].country);
        yValues.push(cg[x].goalsPerCountry);
        sizes.push((cg[x].goalsPerCountry)*7.5);
    }
    let trace1 = {
        x: xValues,
        y: yValues,

        mode: 'markers',
        marker: {
            size: sizes,
            color:yValues
        }
    };

    let data = [trace1];

    let layout = {
        title: 'Number of Goals Per Each Country',

        showlegend: false,
        
    };

    Plotly.newPlot('bubble', data, layout);

}
// Function to update the page when option is changed
function optionChanged(value) {
    standings(value);
    tournamentData(value);
   
    // fetchOTUdetails(value);
}