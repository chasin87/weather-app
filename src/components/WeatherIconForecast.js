import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/WeatherIconForecast.css";

export default function WeatherIconForecast(props) {
  const [icons, setIcons] = useState(null);

  function iconHandler(response) {
    setIcons(response);
  }

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://openweathermap.org/img/wn/${props.code}.png`
        );
        if (mounted) {
          iconHandler(result.config.url);
        }
      } catch (error) {
        console.log("Icon not found forecast", error);
      }
    };
    fetchData();
    return () => (mounted = false);
  }, [props]);

  return (
    <div className="animation_icon">
      <img src={icons} alt="Icons" />
    </div>
  );
}
