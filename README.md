# ПРОГНОЗ ПОГОДЫ
### Сайт прогноза погоды, написанный с использованием API OpenWeather
<
function searchCity(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b9e70f2f2cb65811737840f12d265388`
  )
    .then((obj) => obj.json())
    .then((data) => {
      renderForecast(data);
    });
}
>

![скриншот сайта]["./examples/web_weather.png"]

