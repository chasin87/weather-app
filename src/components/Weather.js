import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchresult from "./SearchResult";
import Loading from "./Loading";

import Geocode from "react-geocode";
import { geolocated } from "react-geolocated";

import "react-circular-progressbar/dist/styles.css";
import { Animated } from "react-animated-css";

import "../styles/SearchResult.css";
import "../styles/Weather.css";

const Weather = (props) => {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [forecastData, setForecastData] = useState({ ready: false });
  const [city, setCity] = useState("Amsterdam");
  const [searcher, setSearcher] = useState("");
  const [unit, setUnit] = useState("celsius");
  const [loading, setLoading] = useState(false);
  const [activeClass, setActiveClass] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);

  function convertToC(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  function convertToF(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function handleResponse(result) {
    setWeatherData({
      ready: true,
      temperature: result.data.main.temp,
      feels_like: result.data.main.feels_like,
      city: result.data.name,
      country: result.data.sys.country,
      icon: result.data.weather[0].icon,
      description: result.data.weather[0].description,
      date: new Date(result.data.dt * 1000),
      temp_max: result.data.main.temp_max,
      temp_min: result.data.main.temp_min,
      wind_speed: result.data.wind.speed,
      wind_degree: result.data.wind.deg,
      humidity: result.data.main.humidity,
    });
  }

  function forecastResponse(responses) {
    setForecastData({
      ready: true,
      responses: responses,
    });
  }

  useEffect(() => {
    if (
      navigator.geolocation &&
      navigator.permissions &&
      navigator.permissions.query
    ) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            locationer();
          } else if (result.state === "prompt") {
            console.log(result.state);
            setCity("Amsterdam");
          } else if (result.state === "denied") {
            setCity("Amsterdam");
            console.log(result.state);
          }
          result.onchange = function () {
            console.log(result.state);
            if (result.state === "denied") {
              setLoadingMessage(false);
            }
          };
        });
    } else if (navigator.geolocation) {
      locationer();
    } else {
      alert("Sorry Not available!");
    }
  }, []);

  Geocode.setApiKey(process.env.REACT_APP_WEATHER_API_GOOGLE);
  Geocode.setLanguage("en");
  Geocode.enableDebug();

  const locationer = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoading(true);
      setLoadingMessage(false);
      let lat = ("Latitude is :", position.coords.latitude);
      let lng = ("Longitude is :", position.coords.longitude);

      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          setCity(false);
          const address = response.results[0].address_components[3].long_name;
          setCity(address);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
    });
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
        );

        handleResponse(result);
        setTimeout(() => {
          setUpdateMessage(false);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log("Please check the city name!", error);
      }
    };
    city && fetchData();
  }, [city]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const resultFor = await axios(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
        );
        setLoading(true);
        forecastResponse(resultFor.data.list);
        setLoading(false);
      } catch (error) {
        console.log("Please check the city name!", error);
      }
    };

    city && fetchForecast();
  }, [city]);

  function handleInput(event) {
    event.preventDefault();
    setSearcher(event.target.value);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  function handleSubmit() {
    if (searcher === "") {
      alert("Please enter a city");
    } else {
      setLoading(true);
      setCity(searcher);
      setSearcher("");
      setActiveClass(false);
      window.scrollTo(0, 0);
      // setLoading(false);
    }
  }

  return (
    <div className="container_data">
      {city ? (
        <div className="Weather">
          {weatherData.ready ? (
            <Animated
              animationIn="rotateIn"
              animationOut="rotateOut"
              animationInDuration={1000}
              animationOutDuration={1000}
              isVisible={true}
            >
              <Searchresult
                data={weatherData}
                locationer={locationer}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                searcher={searcher}
                convertToC={convertToC}
                convertToF={convertToF}
                unit={unit}
                activeClass={activeClass}
                setActiveClass={setActiveClass}
                setUpdateMessage={setUpdateMessage}
                updateMessage={updateMessage}
                setCity={setCity}
                city={city}
                forecastData={forecastData}
                loading={loading}
                setLoadingMessage={setLoadingMessage}
                loadingMessage={loadingMessage}
                handleKeyPress={handleKeyPress}
              />
            </Animated>
          ) : null}
        </div>
      ) : (
        <div className="wrapper">
          <div className="Loading_first">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity,
  },
  watchPosition: false,
  userDecisionTimeout: null,
  suppressLocationOnMount: false,
  geolocationProvider: navigator.geolocation,
  isOptimisticGeolocationEnabled: true,
})(Weather);
