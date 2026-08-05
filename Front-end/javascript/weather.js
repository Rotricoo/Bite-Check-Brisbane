// Weather Brisbane functionallity

function loadWeatherClock() {
  const temperature = document.getElementById("weather--temp");
  const weatherEmoji = document.getElementById("weather--icon");

  async function updateBrisbaneWeather() {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=-27.4679&longitude=153.0281&daily=weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,is_day,rain&timezone=auto&forecast_days=1";
    const response = await fetch(url);
    const data = await response.json();

    const currentTempe = data.current.temperature_2m;
    temperature.textContent = currentTempe + "ºC";

    const weatherCode = data.current.weather_code;
    const isDay = data.current.is_day;

    let emoji = "";

    if (weatherCode === 0 && isDay === 1) {
      emoji = "☀️";
    } else if (weatherCode === 0 && isDay === 0) {
      emoji = "🌙";
    } else if ((weatherCode === 1 || weatherCode === 2 || weatherCode === 3) && isDay === 1) {
      emoji = "🌤️";
    } else if ((weatherCode === 1 || weatherCode === 2 || weatherCode === 3) && isDay === 0) {
      emoji = "☁️";
    } else if (weatherCode === 45 || weatherCode === 48) {
      emoji = "🌫️";
    } else if (
      weatherCode === 51 ||
      weatherCode === 53 ||
      weatherCode === 55 ||
      weatherCode === 56 ||
      weatherCode === 57 ||
      weatherCode === 61 ||
      weatherCode === 63 ||
      weatherCode === 65 ||
      weatherCode === 66 ||
      weatherCode === 67 ||
      weatherCode === 80 ||
      weatherCode === 81 ||
      weatherCode === 82
    ) {
      emoji = "🌧️";
    } else if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
      emoji = "⛈️";
    } else {
      emoji = "❓";
    }

    weatherEmoji.textContent = emoji;
  }

  setInterval(updateBrisbaneWeather, 1800000);

  updateBrisbaneWeather();

  // Hour time logic
  const brisbaneTime = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Brisbane",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const headerTimer = document.getElementById("weather--time");

  function updateBrisbaneTime() {
    const currentTime = new Date();

    const formattedTime = brisbaneTime.format(currentTime);

    headerTimer.textContent = formattedTime;
  }

  setInterval(updateBrisbaneTime, 1000);
  updateBrisbaneTime();
}
