let weather = {
    apiKey: "7fa3241e81da22b85fc30c5f0f554665",
    unsplashApiKey: "yk1Pxbbaa4D4-BOXMYJb1Morh7kSeBYc5WK9IlrEXtk",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
            )
            .then((response) => response .json())
            .then((data) => {
                this.displayWeather(data,);
                this.fetchBackgroundImage(city);
            });
    },
    fetchBackgroundImage: function (city) {
        fetch(
            "https://api.unsplash.com/photos/random/?query=" +
             city +
              "&client_id=" +
              this.unsplashApiKey
        )
        .then((response) => response.json())
        .then((data) => {
            const imageUrl = data.urls.regular;
            document.body.style.backgroundImage = `url(${imageUrl})`;
        });
    },
    displayWeather: function(data) {
        const { name } = data;
        const { weather, main, wind } = data;
        if (weather && weather.length > 0 && main && main.temp) {
            const { icon, description } = weather[0];
            const { temp, humidity } = main;
            const { speed } = wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = 
        "https://openweathermap.org/img/wn/"+ icon +".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        } else {
            console.error("Error: weather data not found.");
        }
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    
    }
};

document.querySelector(".search-bar")
.addEventListener("click", function(event){
weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
})