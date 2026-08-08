import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logoVertical from "../../assets/brand/logo-vertical.png";
import "./header.scss";

function Header() {
  const [temperature, setTemperature] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [weatherTime, setWeatherTime] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    async function updateBrisbaneWeather() {
      try {
        const url =
          "https://api.open-meteo.com/v1/forecast?latitude=-27.4679&longitude=153.0281&daily=weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,is_day,rain&timezone=auto&forecast_days=1";
        const response = await fetch(url);
        const data = await response.json();

        const currentTempe = data.current.temperature_2m;
        setTemperature(currentTempe + "ºC");

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

        setWeatherIcon(emoji);
      } catch (error) {
        console.error("Error updating Brisbane weather:", error);
        setTemperature("--");
        setWeatherIcon("❓");
      }
    }

    function updateBrisbaneTime() {
      const brisbaneTime = new Intl.DateTimeFormat("en-AU", {
        timeZone: "Australia/Brisbane",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const currentTime = new Date();

      const formattedTime = brisbaneTime.format(currentTime);

      setWeatherTime(formattedTime);
    }

    updateBrisbaneWeather();
    updateBrisbaneTime();

    const weatherInterval = setInterval(updateBrisbaneWeather, 1800000);
    const timeInterval = setInterval(updateBrisbaneTime, 1000);

    return () => {
      clearInterval(weatherInterval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__topbar">
          <div className="header__logo">
            <NavLink to="/" className="header__logo--link">
              <img src={logoVertical} alt="Logo" className="header__logo--img" />
            </NavLink>
          </div>
          <button className={`header__nav--toggle ${isMenuOpen ? "is-open" : ""}`} aria-label="Open Menu" onClick={toggleMenu}>
            <div className="header__nav--toggle-icon header__nav--toggle-icon-1"></div>
            <div className="header__nav--toggle-icon header__nav--toggle-icon-2"></div>
            <div className="header__nav--toggle-icon header__nav--toggle-icon-3"></div>
          </button>
        </div>

        <div className={`header__mobile-panel ${isMenuOpen ? "is-open" : ""}`}>
          <nav className="header__nav--menu">
            <NavLink to="/" className="header__nav--menu-link">
              Home
            </NavLink>
            <NavLink to="/about-us" className="header__nav--menu-link">
              About Us
            </NavLink>
            <NavLink to="/all-reviews" className="header__nav--menu-link">
              All Reviews
            </NavLink>
            <NavLink to="/trending-spots" className="header__nav--menu-link">
              Trending Spots
            </NavLink>
            <NavLink to="/student-picks" className="header__nav--menu-link">
              Student Picks
            </NavLink>
            <NavLink to="/contact" className="header__nav--menu-link">
              Contact
            </NavLink>
          </nav>
          <div className="header__weather">
            <div className="header__weather--container">
              <p className="header__weather--temp">{temperature}</p>
              <p className="header__weather--icon">{weatherIcon}</p>
            </div>
            <p className="header__weather--time">{weatherTime}</p>
            <p className="header__weather--local">Brisbane time</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
