var apiKey = "a5add3ea86991b37abdb4b61b61f9a2a";


$("#search-button").on("click", function() {
    
    var searchValue = $("#search-value").val();

    console.log(searchValue);
    currentClimate(searchValue);
    fiveDay(searchValue);
})

function currentClimate (searchValue) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey + "&units=imperial";

    fetch(queryUrl)
          .then(function(response) {
              return response.json()


          })  .then(function(data) {
              console.log(data);
          }) 

        //   var city = document.createElement("h3");
        //   var date = document.createElement("li");

        //   city.textContent = data.name + "Moment Date" + data.weather[0].icon;
        //   weather.textContent = data 
}


function fiveDay (searchValue) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + apiKey + "&units=imperial";

    fetch(queryUrl)
        .then(function(response) {
            return response.json()


        }) .then(function(data) {
            console.log(data);
        })


}


