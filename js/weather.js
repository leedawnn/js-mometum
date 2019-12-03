const weather = document.querySelector(".js-weather"),
  places = document.querySelector(".js-place");

const API_KEY = "5cd80097387470697a8873fa723267a4";
const COORDS = "coords";
function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}`;
      places.innerText = `${place}`;
    });
}
function saveCoords(coorObj) {
  localStorage.setItem(COORDS, JSON.stringify(coorObj));
}
function handleSucess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coorObj = {
    latitude,
    longitude
  };
  saveCoords(coorObj);
  getWeather(latitude, longitude);
}
function handleFail() {
  console.log("can't access current location");
}
function askCoords() {
  navigator.geolocation.getCurrentPosition(handleSucess, handleFail);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCoords();
}

init();