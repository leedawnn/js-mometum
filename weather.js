const htmlCurrentTemp = document.querySelector(".js-weather__current-temp");
const htmlMaxTemp = document.querySelector(".js-weather__min-temp");
const htmlMinTemp = document.querySelector(".js-weather__max-temp");
const htmlPlace = document.querySelector(".js-place");

const currentWeatherDataApiKey = "ac30041f4f66a1c845c21f61f00b85b7";
const LOCATION_LS = "location";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${currentWeatherDataApiKey}&units=metric`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);
      const curTemp = Math.floor(json.main.temp);
      const maxTemp = json.main.temp_max;
      const minTemp = json.main.temp_min;
      const place = json.name;
      console.log(place);
      htmlCurrentTemp.innerText = `${curTemp}°`;
      htmlMaxTemp.innerText = minTemp;
      htmlMinTemp.innerText = maxTemp;
      htmlPlace.innerText = place;
    });
}

function saveLocation(locationObj) {
  localStorage.setItem(LOCATION_LS, JSON.stringify(locationObj));
}
const handleGeoSucces = position => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const locationObj = {
    latitude,
    longitude
  };
  saveLocation(locationObj);
  getWeather(latitude, longitude);
};

const handleGeoError = () => {
  console.log("Cant access geo location");
};
function askForCoords() {
  const localLocation = localStorage.getItem(LOCATION_LS);
  if (localLocation === null) {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
  } else {
    const parseLocation = JSON.parse(localLocation);
    getWeather(parseLocation.latitude, parseLocation.longitude);
  }
}

function init() {
  askForCoords();
}
init();