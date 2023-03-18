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

let p = document.querySelector("p#date");
let time = document.querySelector("time");

p.innerHTML = `${day}, ${month} ${currentDate}, ${currentYear}`;
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

// Temperature data

// Celsius

// function showCelsius(event) {
//   event.preventDefault();

//   let temp = document.querySelector(".temperature");
//   temp.innerHTML = 19;

//   let underlineCelsius = document.querySelector("#celsius-link");
//   underlineCelsius.classList.add("underline");

//   let underlineFahrenheit = document.querySelector("#fahrenheit-link");
//   underlineFahrenheit.classList.remove("underline");
// }

// let celsius = document.querySelector("#celsius-link");
// celsius.addEventListener("click", showCelsius);

// Fahrenheit

// function showFahrenheit(event) {
//   event.preventDefault();

//   let temp = document.querySelector(".temperature");
//   temp.innerHTML = 66;

//   let underlineFahrenheit = document.querySelector("#fahrenheit-link");
//   underlineFahrenheit.classList.add("underline");

//   let underlineCelsius = document.querySelector("#celsius-link");
//   underlineCelsius.classList.remove("underline");
// }
// let fahrenheit = document.querySelector("#fahrenheit-link");
// fahrenheit.addEventListener("click", showFahrenheit);

// Search City

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  let apiKey = "743bee57fddbfaf52447193a87d5dd25";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;

  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = `${temperature}°C`;

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
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${response.data.name}`;

  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;

  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = `${temperature}°C`;

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

  let removeIcon = document.querySelector(".city-icon.is-pin");
  removeIcon.classList.remove("is-pin");

  let addIcon = document.querySelector(".city-icon");
  addIcon.classList.add("is-pin");
}

let currentCity = document.querySelector(".city-icon");
currentCity.addEventListener("click", getCurrentLocation);
