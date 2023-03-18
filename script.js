const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const forecastContainer = document.querySelector(".forecast-container")
const currentWeatherContainer = document.querySelector(".current-weather")
let apiKey = "4216c4406aa1ce036f1d7c6f6d62e977";


let selectedCity = "";

searchBtn.addEventListener("click", () => {
  selectedCity = searchInput.value;
  fetchData(selectedCity);
});

forecastContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("forecast-card")) {
    selectedCity = e.target.dataset.city;
    fetchData(selectedCity);
  }
});

function fetchData(city) {
  let curWeathApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  console.log(city)
  // Fetch data from OpenWeather API using the city parameter
  fetch(curWeathApiUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const currentWeatherCard = document.createElement("div");
    currentWeatherCard.classList.add("forecast-card");
    currentWeatherCard.dataset.city = selectedCity;
    currentWeatherCard.innerHTML = `
      <h2>${city}</h2>
      <p>Temp: ${data.main.temp}</p>
      <p>Wind: ${data.wind.speed} &#8457;</p>
      <p>Humidity: ${data.main.humidity} &#8457;</p>
    `;
    currentWeatherContainer.appendChild(currentWeatherCard);
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=imperial`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          forecastContainer.innerHTML = "";
          
  for(i=3; i<data.list.length; i+=8) {
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    forecastCard.dataset.city = selectedCity;
    let date = data.list[i].dt_txt.slice(0, 10);
    forecastCard.innerHTML = `
      <h2>${data.list[i].dt_txt.slice(0, 10)}</h2>
      <p>Temp: ${data.list[i].main.temp}</p>
      <p>Wind: ${data.list[i].wind.speed} &#8457;</p>
      <p>Humidity: ${data.list[i].main.humidity} &#8457;</p>
    `;
    forecastContainer.appendChild(forecastCard);
 
        }
    })
  // Update the current weather and forecast sections with the received data
  // Generate a button underneath the search bar with text that matches the searched city
}
)}

function updateForecast(forecastData) {
  forecastContainer.innerHTML = "";
  forecastData.forEach((day) => {
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    forecastCard.dataset.city = selectedCity;
    forecastCard.innerHTML = `
      <h2>${day.date}</h2>
      <p>${day.description}</p>
      <p>High: ${day.highTemp} &#8457;</p>
      <p>Low: ${day.lowTemp} &#8457;</p>
    `;
    forecastContainer.appendChild(forecastCard);
  });
}

function updateSelectedCity() {
  const buttons = document.querySelectorAll(".searched-city");
  buttons.forEach((button) => {
    button.classList.remove("selected-city");
    if (button.textContent === selectedCity) {
      button.classList.add("selected-city");
    }
  });
}

