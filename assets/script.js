var apiKey = "a5add3ea86991b37abdb4b61b61f9a2a";
// var todayEl = $("#today");
var todayEl = document.getElementById("today");
var searchedEl = $("#history");
var cities = [];

$("#search-button").on("click", function () {
  var searchValue = $("#search-value").val();
  cities.push(searchValue);
  localStorage.setItem("cities", cities);
  console.log(searchValue);
  currentClimate(searchValue);
  fiveDay(searchValue);

  searchedEl.append();
});

function currentClimate(searchValue) {
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchValue +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        var temp = data.main.temp;
        // stylizing the console to make more readable and logging the various values
      console.log("This is temp---------");
      console.log(temp);

      var wind = data.wind.speed;
      console.log("This is wind----------");
      console.log(wind);

      var humid = data.main.humidity;
      console.log("This is humidity----------");
      console.log(humid);

      var location = data.name;

      console.log("This is the the city being searched---------");
      console.log(location);


      //appending the location, wind, temp and humidity values to the page
      var placeEl = document.createElement("h1");
      $(placeEl).text(location);
      todayEl.append(placeEl);

      var windliEl = document.createElement("li");
      $(windliEl).text("Windspeed: " + wind + " MPH");
      todayEl.append(windliEl);

      var templiEl = document.createElement("li");
      $(templiEl).text("Temperature: " + temp + "°F");
      todayEl.append(templiEl);

      var humiliEl = document.createElement("li");
      $(humiliEl).text("Humidity: " + humid + " %");
      todayEl.append(humiliEl);



      var longitude = data.coord.lon;
      console.log(longitude);
      var latitude = data.coord.lat;
      console.log(latitude);

      uvIndex(latitude, longitude);

      
    }) 
    todayEl.innerHTML = "";
}

function fiveDay(searchValue) {
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchValue +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      fiveDay = data.list;
      console.log("This is the five day forecast---------");
      console.log(fiveDay);

      var fiveDayRowEl = document.createElement("div");
      $(fiveDayRowEl).append(fiveDay);
      todayEl.append(fiveDayRowEl);
    });
}

function uvIndex(latitude, longitude) {
  var uvURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

  fetch(uvURL)
    .then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);

    var uviValue = data.current.uvi;
    console.log(uviValue);

    var uviEl = document.createElement("li");
    $(uviEl).text("UV Index: " + uviValue);
    todayEl.append(uviEl);
  })
}
