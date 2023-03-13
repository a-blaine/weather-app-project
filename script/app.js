function changeLocation(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#search-bar");
  let h1 = document.querySelector("#location");
  h1.innerHTML = `${locationInput.value}`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", changeLocation);

//

//

function displayTemperature(response) {
  let newTemperature = Math.round(response.data.main.temp);
  let center = document.querySelector("#current-temperature");
  center.innerHTML = `${newTemperature}`;

  let currentHighTemp = Math.round(response.data.main.temp_max);
  let leftTemp = document.querySelector("#current-high-temp");
  leftTemp.innerHTML = `${currentHighTemp}°`;

  let currentLowTemp = Math.round(response.data.main.temp_min);
  let rightTemp = document.querySelector("#current-low-temp");
  rightTemp.innerHTML = `${currentLowTemp}°`;

  let description = response.data.weather[0].main;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${description}`;

  let humidity = response.data.main.humidity;
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = ` ${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = ` ${windSpeed}km/h`;
}

function getTemperature(position) {
  let locationInput = document.querySelector("#search-bar");
  let city = locationInput.value;
  let apiKey = "7ae5e58d29dbe83f5367ad389e4a99a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let secondForm = document.querySelector("#search-form");
secondForm.addEventListener("submit", getTemperature);

//

//

function displayDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  let current = new Date();
  let currentDay = days[current.getDay()];
  let currentDate = current.getDate();
  let currentMonth = months[current.getMonth()];
  let currentYear = current.getFullYear();

  let displayedDate = document.querySelector("#displayed-date");
  displayedDate.innerHTML = `${currentDay} ${currentDate} ${currentMonth}, ${currentYear}`;
}
displayDate();

function displayTime(time) {
  let now = new Date();
  let hour = now.getHours();
  let hours = ("0" + hour).slice(-2);
  let minute = now.getMinutes();
  let minutes = ("0" + minute).slice(-2);

  let displayedTime = document.querySelector("#displayed-time");
  displayedTime.innerHTML = `${hours}:${minutes}`;
}
displayTime();

//

//

function updateTemp(response) {
  let city = response.data.name;
  let h1Current = document.querySelector("#location");
  h1Current.innerHTML = `${city}`;

  let mainTemp = document.querySelector("#current-temperature");
  let newMainTemp = Math.round(response.data.main.temp);
  mainTemp.innerHTML = `${newMainTemp}`;

  let newHighTemp = Math.round(response.data.main.temp_max);
  let leftTemp = document.querySelector("#current-high-temp");
  leftTemp.innerHTML = `${newHighTemp}°`;

  let newLowTemp = Math.round(response.data.main.temp_min);
  let rightTemp = document.querySelector("#current-low-temp");
  rightTemp.innerHTML = `${newLowTemp}°`;

  let newDescription = response.data.weather[0].main;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${newDescription}`;

  let newHumidity = response.data.main.humidity;
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = ` ${newHumidity}%`;

  let newWindSpeed = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = ` ${newWindSpeed} km/h`;
}

function fetchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7ae5e58d29dbe83f5367ad389e4a99a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemp);
}

function buttonLocation() {
  navigator.geolocation.getCurrentPosition(fetchLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", buttonLocation);

//

//

function convertToF(response) {
  let temperatureF = Math.round(response.data.main.temp);
  let centerF = document.querySelector("#current-temperature");
  centerF.innerHTML = `${temperatureF}`;

  let highTempF = Math.round(response.data.main.temp_max);
  let leftTempF = document.querySelector("#current-high-temp");
  leftTempF.innerHTML = `${highTempF}°`;

  let lowTempF = Math.round(response.data.main.temp_min);
  let rightTempF = document.querySelector("#current-low-temp");
  rightTempF.innerHTML = `${lowTempF}°`;

  let windSpeedF = Math.round(response.data.wind.speed);
  let displayWindF = document.querySelector("#wind");
  displayWindF.innerHTML = ` ${windSpeedF} mph`;
}

function getTemperatureF(position) {
  let locationInputF = document.querySelector("#search-bar");
  let cityF = locationInputF.value;
  let apiKeyF = "7ae5e58d29dbe83f5367ad389e4a99a2";
  let apiUrlF = `https://api.openweathermap.org/data/2.5/weather?q=${cityF}&appid=${apiKeyF}&units=imperial`;
  axios.get(apiUrlF).then(convertToF);
}

function changeUnitsF(event) {
  event.preventDefault();
  let unitsF = document.querySelector("#fahrenheit-link");
  let unitsC = document.querySelector("#celsius-link");
  unitsC.classList.add("unactive");
  unitsF.classList.add("active");
  getTemperatureF();
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", changeUnitsF);

//

//

function changeUnitsC(event) {
  event.preventDefault();
  let unitsF = document.querySelector("#fahrenheit-link");
  let unitsC = document.querySelector("#celsius-link");
  unitsC.classList.remove("unactive");
  unitsF.classList.remove("active");
  getTemperature();
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeUnitsC);
