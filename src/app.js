function displayTodayDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let dateNumber = date.getDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hours}:${minutes}`;
  formattedDate = `${day} ${dateNumber} ${month} ${year} ${time}`;
  return formattedDate;
}
function injectDate(date) {
  document.querySelector("#current-date").innerHTML = displayTodayDate(date);
}

injectDate(new Date());

function displayCity(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
}
function displayCelsiusTemp(response) {
  celsiusTempNumber = Math.round(response.data.main.temp);
  document.querySelector("#current-temp-number").innerHTML = celsiusTempNumber;
}
function displayDescription(response) {
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function windInfo(response) {
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function displayBackground(response) {
  let cardBackground = document.querySelector(".card");
  console.log(response.data.weather[0].icon);
  if (response.data.weather[0].icon === "01n") {
    cardBackground.classList.add("clear-night");
  } else if (
    response.data.weather[0].icon === "02d" ||
    response.data.weather[0].icon === "03d"
  ) {
    cardBackground.classList.add("few-clouds");
  } else if (response.data.weather[0].icon === "04d") {
    cardBackground.classList.add("broken-overcast-clouds");
  } else if (
    response.data.weather[0].icon === "02n" ||
    response.data.weather[0].icon === "03n" ||
    response.data.weather[0].icon === "04n"
  ) {
    cardBackground.classList.add("night-clouds");
  } else if (
    response.data.weather[0].icon === "09d" ||
    response.data.weather[0].icon === "09n" ||
    response.data.weather[0].icon === "10d" ||
    response.data.weather[0].icon === "10n"
  ) {
    cardBackground.classList.add("rain");
  } else if (
    response.data.weather[0].icon === "11d" ||
    response.data.weather[0].icon === "11n"
  ) {
    cardBackground.classList.add("thunderstorm");
  } else if (
    response.data.weather[0].icon === "13d" ||
    response.data.weather[0].icon === "13n"
  ) {
    cardBackground.classList.add("snow");
  } else if (
    response.data.weather[0].icon === "50d" ||
    response.data.weather[0].icon === "50n"
  ) {
    cardBackground.classList.add("mist");
  }
}
function displayElements(response) {
  displayCity(response);
  displayCelsiusTemp(response);
  displayDescription(response);
  windInfo(response);
  displayBackground(response);
  getForecast(response.data.coord);
}

function handleCoords(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayElements);
}
function getCoords(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleCoords);
}

let currentWeather = document.querySelector("#current-location-weather");
currentWeather.addEventListener("click", getCoords);

function calculateCelsius() {
  backToCelsius.classList.add("unit-styling");
  fahrenheit.classList.remove("unit-styling");
  document.querySelector("#current-temp-number").innerHTML =
    Math.round(celsiusTempNumber);
}
function convertBackToCelsius(event) {
  event.preventDefault();
  calculateCelsius();
}

function calculateFahrenheit() {
  fahrenheit.classList.add("unit-styling");
  backToCelsius.classList.remove("unit-styling");
  document.querySelector("#current-temp-number").innerHTML = Math.round(
    (celsiusTempNumber * 9) / 5 + 32
  );
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  calculateFahrenheit();
}
let fahrenheit = document.querySelector("#convert-to-fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemp);

let backToCelsius = document.querySelector("#convert-to-celsius");
backToCelsius.addEventListener("click", convertBackToCelsius);

let celsiusTempNumber = null;

function searchCity(city) {
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayElements);
}
function displayDate(timestamp) {
  let rawDate = timestamp * 1000;
  let formattedDate = new Date(rawDate);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[formattedDate.getDay()];
  return day;
}
function displayForecast(response) {
  let generalContent = response.data.daily;
  let forecastSection = document.querySelector("#forecast-section");
  let forecastContent = "";
  generalContent.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastContent =
        forecastContent +
        `<div class="row">
            <div class="col">${displayDate(forecastDay.dt)}</div>
            <div class="col"><strong>${Math.round(
              forecastDay.temp.max
            )}</strong> | ${Math.round(forecastDay.temp.min)}°C</div>
            <div class="col"> <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" width="40"></div>
          </div>`;
    }
  });
  forecastSection.innerHTML = forecastContent;
}

function getForecast(coords) {
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
function handleSubmit(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-input");
  let input = userInput.value;
  input = input.trim();
  let inputRest = input.toLowerCase();
  let inputFirst = input.charAt(0).toUpperCase();
  input = inputFirst + inputRest.substr(1);

  searchCity(input);
}
let searchEngineForm = document.querySelector("#search-engine-form");
searchEngineForm.addEventListener("submit", handleSubmit);

const apiKey = `62f780f73f5ee00aa0f4d27f32e096c2`;
searchCity(`Paris`);
