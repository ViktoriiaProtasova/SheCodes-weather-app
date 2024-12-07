// Getting dates

let now = new Date();
let currentDate = now.getDate();
let currentYear = now.getFullYear();
let hours = `${now.getHours()}`.padStart(2, '0');
let minutes = `${now.getMinutes()}`.padStart(2, '0');

let days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

let day = days[now.getDay()];

let months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

let month = months[now.getMonth()];
let date = document.querySelector('p#date');
let time = document.querySelector('#time');
let celsiusTemperature = null;

date.innerHTML = `${day}, ${month} ${currentDate}, ${currentYear}`;
time.innerHTML = `${hours}:${minutes}`;

// Search function

function search(event) {
	event.preventDefault();

	let input = document.querySelector('#search-text-field');
	let h1 = document.querySelector('h1');

	if (input.value) {
		h1.innerHTML = input.value;
		searchCity(input.value);
	} else {
		h1.innerHTML = null;
		alert('Please, type a city');
		h1.innerHTML = 'Weather';
	}
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', search);

// Search City

function searchCity(city) {
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
	let apiKey = '743bee57fddbfaf52447193a87d5dd25';

	axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

// Reset Search Form

function resetSearchForm() {
	document.getElementById('search-form').reset();
	location.reload();
}

let cityIconPin = document.querySelector('.is-pin');
cityIconPin.addEventListener('click', resetSearchForm);

// Show Temperature

function showTemperature(response) {
	let currentCity = document.querySelector('#city');
	currentCity.innerHTML = response.data.name;

	// cityName = response.data.name;

	let temperature = Math.round(response.data.main.temp);
	celsiusTemperature = Math.round(response.data.main.temp);

	let currentLink = document.querySelector('#celsius');
	currentLink.classList.add('current');

	let description = document.querySelector('#temperature-description');
	description.innerHTML = response.data.weather[0].description;

	let temperatureElement = document.querySelector('.temperature');
	temperatureElement.innerHTML = `${temperature}`;

	let humidity = response.data.main.humidity;
	let humidityElement = document.querySelector('#humidity');
	humidityElement.innerHTML = `Humidity: ${humidity} %`;

	let wind = Math.round(response.data.wind.speed * 3.6);
	let windElement = document.querySelector('#wind');
	windElement.innerHTML = `Wind: ${wind} km/h`;

	let minTemp = Math.round(response.data.main.temp_min);
	let min = document.querySelector('.min');
	min.innerHTML = `L : ${minTemp}°`;

	let maxTemp = Math.round(response.data.main.temp_max);
	let max = document.querySelector('.max');
	max.innerHTML = `H : ${maxTemp}°`;

	let icon = document.querySelector('.image');
	icon.setAttribute(
		'src',
		`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);

	getForecast(response.data.coord);
	getHourlyForecast(response.data.coord);
}

function showWeather(response) {
	let h1 = document.querySelector('h1');
	h1.innerHTML = `${response.data.name}`;

	// cityName = response.data.name;

	let temperature = Math.round(response.data.main.temp);
	let temperatureElement = document.querySelector('.temperature');
	temperatureElement.innerHTML = temperature;

	celsiusTemperature = Math.round(response.data.main.temp);

	let currentLink = document.querySelector('#celsius');
	currentLink.classList.add('current');

	let description = document.querySelector('#temperature-description');
	description.innerHTML = response.data.weather[0].description;

	let humidity = response.data.main.humidity;
	let humidityElement = document.querySelector('#humidity');
	humidityElement.innerHTML = `Humidity: ${humidity} %`;

	let wind = Math.round(response.data.wind.speed * 3.6);
	let windElement = document.querySelector('#wind');
	windElement.innerHTML = `Wind: ${wind} km/h`;

	let minTemp = Math.round(response.data.main.temp_min);
	let min = document.querySelector('.min');
	min.innerHTML = `L : ${minTemp}°`;

	let maxTemp = Math.round(response.data.main.temp_max);
	let max = document.querySelector('.max');
	max.innerHTML = `H : ${maxTemp}°`;

	let icon = document.querySelector('#image');
	icon.setAttribute(
		'src',
		`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	icon.setAttribute('alt', response.data.weather[0].description);

	getForecast(response.data.coord);
	getHourlyForecast(response.data.coord);
}

// Display Forecast

function displayForecast(response) {
	let forecast = response.data.daily;

	forecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			let currentDay = document.querySelectorAll('.weather-forecast-day')[
				index
			];
			currentDay.innerHTML = formatDay(forecastDay.dt);

			let currentTempMax = document.querySelectorAll('.weekly-forecast .max')[
				index
			];
			currentTempMax.innerHTML = `${Math.round(forecastDay.temp.max)}°`;

			let currentTempMin = document.querySelectorAll('.weekly-forecast .min')[
				index
			];
			currentTempMin.innerHTML = `${Math.round(forecastDay.temp.min)}°`;

			let icon = document.querySelector('.weekly-forecast #image');
			icon.setAttribute(
				'src',
				`http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png`
			);
		}
	});
}

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	return days[day];
}

function getForecast(coordinates) {
	let apiKey = '743bee57fddbfaf52447193a87d5dd25';
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}

function displayHourlyForecast(response) {
	let hourlyForecast = response.data.hourly;

	hourlyForecast.forEach(function (hourlyData, index) {
		if (index < 24) {
			let currentHour = document.querySelectorAll('.weather-forecast-time')[
				index
			];
			currentHour.innerHTML = formatHour(hourlyData.dt);

			let currentTemp = document.querySelectorAll(
				'.hourly-forecast-temperature'
			)[index];
			currentTemp.innerHTML = `${Math.round(hourlyData.temp)}°`;

			let icon = document.querySelectorAll('.hourly-forecast #image')[index];
			icon.setAttribute(
				'src',
				`http://openweathermap.org/img/wn/${hourlyData.weather[0].icon}.png`
			);
		}
	});
}

// Get Forecast by coordinates

function getHourlyForecast(coordinates) {
	let apiKey = '743bee57fddbfaf52447193a87d5dd25';
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayHourlyForecast);
}

function formatHour(timestamp) {
	let date = new Date(timestamp * 1000);
	let hours = date.getHours();
	return `${hours}:00`;
}

function currentPosition(position) {
	let apiKey = '743bee57fddbfaf52447193a87d5dd25';
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(currentPosition);

	let removeIcon = document.querySelector('.is-pin');
	removeIcon.classList.remove('is-pin');

	let addIcon = document.querySelector('.city-icon');
	addIcon.classList.add('is-pin');
}

let currentCity = document.querySelector('.city-icon');
currentCity.addEventListener('click', getCurrentLocation);

// Change Forecast To

function changeForecastToWeekly() {
	let currentWeekly = document.querySelector('.weekly-forecast');
	currentWeekly.classList.add('current-forecast');

	let disabledWeekly = document.querySelector('.weekly-forecast');
	disabledWeekly.classList.remove('disabled-forecast');

	let disabledHourly = document.querySelector('.hourly-forecast');
	disabledHourly.classList.add('disabled-forecast');

	let currentHourly = document.querySelector('.hourly-forecast');
	currentHourly.classList.remove('current-forecast');
}

let weeklyForecast = document.querySelector('#weekly-forecast');
weeklyForecast.addEventListener('click', changeForecastToWeekly);

function changeForecastToHourly() {
	let currentHourly = document.querySelector('.hourly-forecast');
	currentHourly.classList.add('current-forecast');

	let disabledHourly = document.querySelector('.hourly-forecast');
	disabledHourly.classList.remove('disabled-forecast');

	let disabledWeekly = document.querySelector('.weekly-forecast');
	disabledWeekly.classList.add('disabled-forecast');

	let currentWeekly = document.querySelector('.weekly-forecast');
	currentWeekly.classList.remove('current-forecast');
}

let hourlyForecast = document.querySelector('#hourly-forecast');
hourlyForecast.addEventListener('click', changeForecastToHourly);
