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
    return props.code
      ? axios
          .get(`http://openweathermap.org/img/wn/${props.code}@2x.png`)
          .then((response) => {
            iconHandler(response.config.url);
          })
          .catch((error) => {
            alert("Icon not found forecast", error);
          })
      : null;
  }, [props.code]);

  // const codeMapping = {
  //   "01d": "CLEAR_DAY",
  //   "01n": "CLEAR_NIGHT",
  //   "02d": "PARTLY_CLOUDY_DAY",
  //   "02n": "PARTLY_CLOUDY_NIGHT",
  //   "03d": "PARTLY_CLOUDY_DAY",
  //   "03n": "PARTLY_CLOUDY_NIGHT",
  //   "04d": "CLOUDY",
  //   "04n": "CLOUDY",
  //   "09d": "RAIN",
  //   "09n": "RAIN",
  //   "10d": "RAIN",
  //   "10n": "RAIN",
  //   "11d": "RAIN",
  //   "11n": "RAIN",
  //   "13d": "SNOW",
  //   "13n": "SNOW",
  //   "50d": "FOG",
  //   "50n": "FOG",
  // };

  return (
    <div className="animation_icon">
      <img src={icons} alt="Icons" />
      {/* <ReactAnimatedWeather
        icon={codeMapping[props.code]}
        color="#D9D9D9"
        size={48}
        animate={true}
      /> */}
    </div>
  );
}
