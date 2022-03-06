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

function handleData(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temp-number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}

function handleCoords(position) {
  let apiKey = `62f780f73f5ee00aa0f4d27f32e096c2`;
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(handleData);
}
function getCoords(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleCoords);
}

let currentWeather = document.querySelector("#current-location-weather");
currentWeather.addEventListener("click", getCoords);
