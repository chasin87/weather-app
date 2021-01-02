import React, { useState, useEffect } from "react";
import axios from "axios";
// import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherIcon(props) {
  const [icons, setIcons] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function iconHandler(response) {
    setIcons(response);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios(
          `http://openweathermap.org/img/wn/${props.code}@2x.png`
        );
        iconHandler(result.config.url);
      } catch (error) {
        console.log("Icon not found forecast", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [props.code]);

  //icons notloading online

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
    <div>
      {isLoading ? <div>Loading ...</div> : <img src={icons} alt="Icons" />}
    </div>
  );
}
