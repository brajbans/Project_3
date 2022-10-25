// Create a map object.
let myMap = L.map("map", {
  center: [
    17.6078, -8.0817
  ],
  zoom: 2.5,
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Define a markerSize() function that will give each country a different radius based on the number of world cups won.
function markerSize(worldcups_won) {
  return ((worldcups_won) + 1)*60000;
}


// Each country object contains the country's name, location, and world cups won.
// World cup Data Source: The Sporting News as at 18/10/2022
// https://www.sportingnews.com/uk/soccer/news/fifa-world-cup-which-teams-have-qualified/86nbyru9dkh41ii7s800gjwav
// latitude and longitude has been added through google
let countries = [
  {
    name: "Qatar",
    location: [25.323188856709972, 51.179129488584],
    worldcups_won: 0
  },
  {
    name: "Germany",
    location: [51.03467762529972, 10.67028457805091],
    worldcups_won: 4
  },
  {
    name: "Denmark",
    location: [55.62493522328807, 9.959463644299316],
    worldcups_won: 0
  },
  {
    name: "Brazil",
    location: [-8.61663313407214, -54.92696468451415],
    worldcups_won: 5
  },
  {
    name: "France",
    location: [46.661739832697386, 2.2878979700174518],
    worldcups_won: 2
  },
  {
    name: "Belgium",
    location: [50.50158424955036, 4.688515721672962],
    worldcups_won: 0
  },
  {
    name: "Croatia",
    location: [45.07240867354711, 14.646478833256651],
    worldcups_won: 0
  },
  {
    name: "Spain",
    location: [39.589128705687116, -3.388949963404547],
    worldcups_won: 0
  },
  {
    name: "Serbia",
    location: [44.12577256533072, 20.765775364601943],
    worldcups_won: 0
  },
  {
    name: "England",
    location: [52.10466989674195, -1.8034560732671716],
    worldcups_won: 1
  },
  {
    name: "Switzerland",
    location: [46.82135410667063, 8.112658364613381],
    worldcups_won: 0
  },
  {
    name: "Argentina",
    location: [-34.99218104805809, -65.29227220009183],
    worldcups_won: 2
  },
  {
    name: "Iran",
    location: [32.12289292944059, 54.03244537988502],
    worldcups_won: 0
  },
  {
    name: "South Korea",
    location: [35.911312252482965, 127.83574007451632],
    worldcups_won: 0
  },
  {
    name: "Japan",
    location: [36.73524304220713, 138.45221785822173],
    worldcups_won: 0
  },
  {
    name: "Saudi Arabia",
    location: [23.634381417924185, 45.890565295372916],
    worldcups_won: 0
  },
  {
    name: "Ecuador",
    location: [-1.0797862344095288, -77.78485051284476],
    worldcups_won: 0
  },
  {
    name: "Uruguay",
    location: [-32.76699965750663, -55.88609373399954],
    worldcups_won: 2
  },
  {
    name: "Canada",
    location: [60.65712174762302, -112.19469984933872],
    worldcups_won: 0
  },
  {
    name: "Ghana",
    location: [7.9202403186671635, -1.1876967753368457],
    worldcups_won: 0
  },
  {
    name: "Senegal",
    location: [14.383166792804406, -14.575155551390658],
    worldcups_won: 0
  },
  {
    name: "Portugal",
    location: [39.80949686758075, -8.358785475261568],
    worldcups_won: 0
  },
  {
    name: "Poland",
    location: [52.91425504480584, 18.691546198377903],
    worldcups_won: 0
  },
  {
    name: "Tunisia",
    location: [34.164809129314094, 9.506622017567798],
    worldcups_won: 0
  },
  {
    name: "Morocco",
    location: [31.88995774374201, -6.524370870960934],
    worldcups_won: 0
  },
  {
    name: "Cameroon",
    location: [5.775543228934501, 12.936972732712224],
    worldcups_won: 0
  },
  {
    name: "USA",
    location: [39.8104526295196, -101.24037150966014],
    worldcups_won: 0
  },
  {
    name: "Mexico",
    location: [24.181501245824414, -102.52762750735523],
    worldcups_won: 0
  },
  {
    name: "Wales",
    location: [52.017560729864925, -4.35513004295328],
    worldcups_won: 0
  },
  {
    name: "Australia",
    location: [-25.375249885480297, 135.15809012880257],
    worldcups_won: 0
  },
  {
    name: "Costa Rica",
    location: [10.472582086165936, -83.69685967131062],
    worldcups_won: 0
  },
 
];

// Loop through the cities array, and create one marker for each city object.
for (let i = 0; i < countries.length; i++) {
  L.circle(countries[i].location, {
    fillOpacity: 0.75,
    color: "black",
    fillColor: "red",
    // Setting our circle's radius to equal the output of our markerSize() function:
    // This will make our marker's size proportionate to its population.
    radius: markerSize(countries[i].worldcups_won)
  }).bindPopup(`<h1>${countries[i].name}</h1> <hr> <h3>World Cups Won: ${countries[i].worldcups_won.toLocaleString()}</h3>`).addTo(myMap);
};
