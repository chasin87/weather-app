import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherIcon(props) {
  const [icons, setIcons] = useState(null);

  function iconHandler(response) {
    setIcons(response);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://openweathermap.org/img/wn/${props.code}@2x.png`
        );
        iconHandler(result.config.url);
      } catch (error) {
        console.log("Icon not found forecast", error);
      }
    };
    fetchData();
  }, [props.code]);

  return (
    <div>
      <img src={icons} alt="Icons" />
    </div>
  );
}
