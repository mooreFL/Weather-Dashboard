var todayElement = document.getElementById("today");
var forecastEl = document.getElementById("forecast");
var searchButton = document.getElementById("search-button");
//parses data from localstorage, empty array allows first time user functionality
var cities = JSON.parse(localStorage.getItem("cities")) || [];
var cityHistory = document.querySelector("#history");

searchButton.addEventListener("click", priorSearch);

function priorSearch() {
  var searchValue = document.querySelector("#search-value").value;
  // ! reverses the value and returns the opposite
  if (!cities.includes(searchValue)) {
    //unshift adds one or more elements to beginning of array and returns new length
    cities.unshift(searchValue);
    // puts cities in string
    localStorage.setItem("cities", JSON.stringify(cities));

    currentClimate(searchValue);
    fiveDay(searchValue);
    saveSearchValue();
  }
}

function saveSearchValue() {
  cityHistory.innerHTML = "";
  var cities = JSON.parse(localStorage.getItem("cities")) || [];
  console.log(cities);
  // for loop for the cities searched
  for (var i = 0; i < cities.length; i++) {
    var cityPrev = document.createElement("button");
    cityPrev.setAttribute("location", cities[i]);
    //text content of button
    cityPrev.textContent = cities[i];
    // listening for click and getting attributes
    cityPrev.addEventListener("click", function () {
      // gets the location values of the buttons
      currentClimate(this.getAttribute("location"));
      fiveDay(this.getAttribute("location"));
    });

    cityHistory.appendChild(cityPrev);
  }
}
//current weather function
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
      var location = data.name;
      var temp = data.main.temp;
      var wind = data.wind.speed;
      var humid = data.main.humidity;
      var longitude = data.coord.lon;
      var latitude = data.coord.lat;
      var dateEl = moment().format("MM/DD/YYYY");
      var iconWeatherEl =
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
      var iconEl = document.createElement("img");
      var placeEl = document.createElement("h1");
      var templiEl = document.createElement("li");
      var windliEl = document.createElement("li");
      var humiliEl = document.createElement("li");
      // setting the attribute for the weather icons
      iconEl.setAttribute("src", iconWeatherEl);

      uvIndex(latitude, longitude);
      // stylizing the console to make more readable and logging the various values
      console.log("temperature---------");
      console.log(temp);
      console.log("wind speed----------");
      console.log(wind);
      console.log("humidity----------");
      console.log(humid);
      console.log("city being searched---------");
      console.log(location);
      console.log("longitude---------");
      console.log(longitude);
      console.log("latitude---------");
      console.log(latitude);
      //stylizing the today container 
      $(todayElement).css({ border: "black solid 2px", padding: "10px" });
      $(placeEl).text(location + " " + dateEl + "");
      $(windliEl).text("Windspeed: " + wind + " MPH");
      $(templiEl).text("Temperature: " + temp + "°F");
      $(humiliEl).text("Humidity: " + humid + " %");

      todayElement.append(placeEl);
      todayElement.append(iconEl);
      todayElement.append(windliEl);
      todayElement.append(templiEl);
      todayElement.append(humiliEl);
    });
  todayElement.innerHTML = "";
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

      forecastEl.innerHTML = "";

      var day = 1;
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          var todayDate = moment().add(day, "days").format("MM/DD/YYYY");
          var date = todayDate;
          var iconUrl =
            "http://openweathermap.org/img/wn/" +
            data.list[i].weather[0].icon +
            ".png";
          var temp = "Temp: " + data.list[i].main.temp + "°F";
          var wind = "Wind: " + data.list[i].wind.speed + " MPH";
          var humidity = "Humidity: " + data.list[i].main.humidity + " %";

          var cardEl = document.createElement("div");
          cardEl.classList.add("card");

          var dateFiveEl = document.createElement("h5");
          dateFiveEl.textContent = date;
          cardEl.append(dateFiveEl);

          var iconFiveEl = document.createElement("img");
          iconFiveEl.setAttribute("src", iconUrl);
          cardEl.append(iconFiveEl);

          var tempFiveEl = document.createElement("p");
          tempFiveEl.textContent = temp;
          cardEl.append(tempFiveEl);

          var windFiveEl = document.createElement("p");
          windFiveEl.textContent = wind;
          cardEl.append(windFiveEl);

          var humidFiveEl = document.createElement("p");
          humidFiveEl.textContent = humidity;
          cardEl.append(humidFiveEl);

          forecastEl.append(cardEl);

          day++;
        }
      }
    });
}

function uvIndex(latitude, longitude) {
  var uviURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    apiKey;

  fetch(uviURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var uviValue = data.current.uvi;
      console.log(uviValue);

      var uviEl = document.createElement("li");
      $(uviEl).text("UV Index: " + uviValue);
      todayElement.append(uviEl);
    });
}
saveSearchValue();
