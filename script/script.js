const wrapper = document.querySelector("main");

navigator.geolocation.getCurrentPosition(success, error);


function success(position) {
  const { longitude, latitude } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b9e70f2f2cb65811737840f12d265388`
  )
    .then((objWeather) => objWeather.json()) //парсим промис и обрабатываем его до объекта в следующем зен
    .then((dataWeather) => {
      console.log(dataWeather);
      renderForecast(dataWeather);
    });
}

//отрисовка погоды из объекта апи
function renderForecast(obj) {
  obj.weather ?? errorFind();
  let forecast = obj.weather[0].description;
  function ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }

  wrapper.innerHTML = `
        <p class="temp">${Math.round(obj.main.temp - 273) + "°С"}</p>
        <p class="forecast">${ucFirst(forecast)} in ${obj.name}</p>
        <a href="#" class="change-city">Change city</a>`;

  const linkChange = wrapper.querySelector(".change-city");

  linkChange.addEventListener("click", inputCity);
}

//функция поиска по городу
function inputCity() {
  wrapper.innerHTML = `
      <form> 
        <input type="text" class="inp-city" placeholder="Type your city here">
        <button class="enter-city">Find</button>
      </form>`;

  let form = wrapper.querySelector("form");

  let inpCity = wrapper.querySelector(".inp-city");
  inpCity.addEventListener("change", () => {
    let inpValue = inpCity.value.toLowerCase().trim();
    searchCity(inpValue);
  });

  form.addEventListener("click", (evt) => evt.preventDefault());
}

function searchCity(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b9e70f2f2cb65811737840f12d265388`
  )
    .then((obj) => obj.json())
    .then((data) => {
      renderForecast(data);
    });
}

function error() {
  fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_OKC7QyCasldCxv4d9LhCFLTh4pYdU`
  )
    .then((obj) => obj.json())
    .then((data) => searchCity(data.location.region))
    .catch(() => {
      inputCity();
    });
}

function errorFind() {
  wrapper.innerHTML = `
    <p class="inp-city" style="border: none; margin-bottom: 0">Ooops. Something went wrong.</p>
    <p class="inp-city" style="border: none; font-size: 12px">Error info<p>
    <button class="enter-city again">Try again</button>`;

  const buttonAgain = wrapper.querySelector(".again");
  buttonAgain.addEventListener("click", inputCity);
}
