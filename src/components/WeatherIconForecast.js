import React, { useEffect, useState } from "react";
// import ReactAnimatedWeather from "react-animated-weather";
import axios from "axios";

import "../styles/WeatherIconForecast.css";

export default function WeatherIconForecast(props) {
  const [icons, setIcons] = useState(null);

  function iconHandler(response) {
    setIcons(response);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://openweathermap.org/img/wn/${props.code}.png`
        );
        iconHandler(result.config.url);
      } catch (error) {
        console.log("Icon not found forecast", error);
      }
    };
    fetchData();
  }, [props]);

  return (
    <div className="animation_icon">
      <img src={icons} alt="Icons" />
    </div>
  );
}
