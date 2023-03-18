// Getting dates
let now = new Date();
let currentDate = now.getDate();
let currentYear = now.getFullYear();
let hours = `${now.getHours()}`.padStart(2, "0");
let minutes = `${now.getMinutes()}`.padStart(2, "0");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];

let date = document.querySelector("p#date");
let time = document.querySelector("time");

let celsiusTemperature = null;
let cityName = "";

date.innerHTML = `${day}, ${month} ${currentDate}, ${currentYear}`;
time.innerHTML = `${hours}:${minutes}`;

// Search function

function search(event) {
  event.preventDefault();

  let input = document.querySelector("#search-text-field");
  let h1 = document.querySelector("h1");

  if (input.value) {
    h1.innerHTML = input.value;
    searchCity(input.value);
  } else {
    h1.innerHTML = null;
    alert("Please, type a city");
    h1.innerHTML = "Weather";
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Search City

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  let apiKey = "743bee57fddbfaf52447193a87d5dd25";

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;

  cityName = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = Math.round(response.data.main.temp);

  let currentLink = document.querySelector("#celsius-link");
  currentLink.classList.add("current");

  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;

  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity} %`;

  let wind = Math.round(response.data.wind.speed * 3.6);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind} km/h`;

  let minTemp = Math.round(response.data.main.temp_min);
  let min = document.querySelector(".min");
  min.innerHTML = `L : ${minTemp}°`;

  let maxTemp = Math.round(response.data.main.temp_max);
  let max = document.querySelector(".max");
  max.innerHTML = `H : ${maxTemp}°`;

  let icon = document.querySelector("#image");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;

  cityName = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = temperature;

  celsiusTemperature = Math.round(response.data.main.temp);

  let currentLink = document.querySelector("#celsius-link");
  currentLink.classList.add("current");

  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity} %`;

  let wind = Math.round(response.data.wind.speed * 3.6);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind} km/h`;

  let minTemp = Math.round(response.data.main.temp_min);
  let min = document.querySelector(".min");
  min.innerHTML = `L : ${minTemp}°`;

  let maxTemp = Math.round(response.data.main.temp_max);
  let max = document.querySelector(".max");
  max.innerHTML = `H : ${maxTemp}°`;

  let icon = document.querySelector("#image");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function currentPosition(position) {
  let apiKey = "743bee57fddbfaf52447193a87d5dd25";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);

  let removeIcon = document.querySelector(".is-pin");
  removeIcon.classList.remove("is-pin");

  let addIcon = document.querySelector(".city-icon");
  addIcon.classList.add("is-pin");
}

let currentCity = document.querySelector(".city-icon");
currentCity.addEventListener("click", getCurrentLocation);

// Temperature data

// Celsius

function showCelsius(event) {
  event.preventDefault();

  if (cityName !== "") {
    let temp = document.querySelector(".temperature");
    temp.innerHTML = celsiusTemperature;
  } else {
    let temperatureElement = document.querySelector(".temperature");
    temperatureElement.innerHTML = `t`;
  }
  let currentLinkCelsius = document.querySelector("#celsius-link");
  currentLinkCelsius.classList.add("current");

  let currentLinkFahrenheit = document.querySelector("#fahrenheit-link");
  currentLinkFahrenheit.classList.remove("current");
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);

// Fahrenheit (°C * 9 / 5) + 32

function showFahrenheit(event) {
  event.preventDefault();

  if (cityName !== "") {
    let temp = document.querySelector(".temperature");
    temp.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  } else {
    let temperatureElement = document.querySelector(".temperature");
    temperatureElement.innerHTML = `t`;
  }

  let currentLinkFahrenheit = document.querySelector("#fahrenheit-link");
  currentLinkFahrenheit.classList.add("current");

  let currentLinkCelsius = document.querySelector("#celsius-link");
  currentLinkCelsius.classList.remove("current");
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

// Reset Search Form

function resetSearchForm() {
  document.getElementById("search-form").reset();
  location.reload();
}

let cityIconPin = document.querySelector(".is-pin");
cityIconPin.addEventListener("click", resetSearchForm);
