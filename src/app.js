function displayDate(date) {
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
  document.querySelector("#current-date").innerHTML = displayDate(date);
}

injectDate(new Date());

function displayCity(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
}
function displayCelsiusTemp(response) {
  document.querySelector("#current-temp-number").innerHTML = Math.round(
    response.data.main.temp
  );
}
function displayDescription(response) {
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function displayElements(response) {
  displayCity(response);
  displayCelsiusTemp(response);
  displayDescription(response);
}

function handleCoords(position) {
  let apiKey = `62f780f73f5ee00aa0f4d27f32e096c2`;
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

// shall I use a change class name? instead of all of this?

function calculateFahrenheit() {
  document.querySelector("#fahrenheit").innerHTML = `<strong>ì§¸F</strong>`;
  document.querySelector(
    "#celsius"
  ).innerHTML = ` <a href="#" id="convert-to-celsius">ì§¸C </a>`;
  let backToCelsius = document.querySelector("#convert-to-celsius");
  backToCelsius.addEventListener("click", convertBackToCelsius);
  let celsiusTemp = document.querySelector("#current-temp-number").innerHTML;
  let celsiusTempNumber = Number(celsiusTemp);
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

function calculateCelsius() {
  document.querySelector("#celsius").innerHTML = `<strong>ì§¸C</strong>`;
  document.querySelector(
    "#fahrenheit"
  ).innerHTML = `<a href="#" id="convert-to-fahrenheit">ì§¸F</a>`;
  let fahrenheit = document.querySelector("#convert-to-fahrenheit");
  fahrenheit.addEventListener("click", displayFahrenheitTemp);
  let fahTemp = document.querySelector("#current-temp-number").innerHTML;
  let fahTempNumber = Number(fahTemp);
  document.querySelector("#current-temp-number").innerHTML = Math.round(
    ((fahTempNumber - 32) * 5) / 9
  );
}
function convertBackToCelsius(event) {
  event.preventDefault();
  calculateCelsius();
}
// shall i send metric as a parameter?

function searchCity(city) {
  let apiKey = `62f780f73f5ee00aa0f4d27f32e096c2`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayElements);
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

searchCity(`Rome`);
