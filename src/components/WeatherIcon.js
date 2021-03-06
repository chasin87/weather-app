import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/WeatherIconForecast.css";

export default function WeatherIcon(props) {
  const [icons, setIcons] = useState(null);

  function iconHandler(response) {
    setIcons(response);
  }

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://openweathermap.org/img/wn/${props.code}@2x.png`
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
  }, [props.code]);

  return (
    <div>
      <img src={icons} alt="Icons" className="img_icon" />
    </div>
  );
}
