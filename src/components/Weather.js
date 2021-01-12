import React, { useState, useEffect } from "react";
// import { Container } from "@material-ui/core";
import Searchresult from "./SearchResult";
import axios from "axios";
import "../styles/Weather.css";
import Geocode from "react-geocode";
import "../styles/SearchResult.css";
import Loading from "./Loading";

import "react-circular-progressbar/dist/styles.css";
import { Animated } from "react-animated-css";

export default function Weather() {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [forecastData, setForecastData] = useState({ ready: false });
  const [city, setCity] = useState(null);
  const [searcher, setSearcher] = useState("");
  const [later, setLater] = useState(false);
  const [lnger, setLnger] = useState(false);
  // const [set, setSet] = useState(true);
  const [unit, setUnit] = useState("celsius");
  const [loading, setLoading] = useState(false);
  const [activeClass, setActiveClass] = useState(false);
  const [renew, setRenew] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(false);

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
    locationer();
    // setLoading(true);
  }, []);

  Geocode.setApiKey(process.env.REACT_APP_WEATHER_API_GOOGLE);
  Geocode.setLanguage("en");
  Geocode.enableDebug();

  const locationer = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoading(true);
      let lat = ("Latitude is :", position.coords.latitude);
      let lng = ("Longitude is :", position.coords.longitude);
      setLater(position.coords.latitude);
      setLnger(position.coords.longitude);

      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          setCity(false);
          const address = response.results[0].address_components[3].long_name;
          // const { lat, lng } = response.results[0].geometry.location;
          // setLater(lat);
          // setLnger(lng);
          setCity(address);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  };

  city &&
    Geocode.fromAddress(city).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLater(lat);
        setLnger(lng);
      },
      (error) => {
        console.error(error);
      }
    );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
        );

        handleResponse(result);
        setTimeout(() => {
          setUpdateMessage(false);
        }, 2000);
      } catch (error) {
        console.log("Please check the city name!", error);
      }
    };
    city && fetchData();
  }, [city, updateMessage]);

  useEffect(() => {
    city &&
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${later}&lon=${lnger}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
        )
        .then((responses) => {
          setLoading(true);
          forecastResponse(responses.data.daily);
          console.log("responses.data.daily", responses.data.daily);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Please check the city name!", error);
        });
  }, [later, lnger, city]);

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

  function handleInput(event) {
    event.preventDefault();
    setSearcher(event.target.value);
  }

  // function handleInputDefault(event) {
  //   setCity(event.target.value);
  // }

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
                renew={renew}
                setRenew={setRenew}
                setUpdateMessage={setUpdateMessage}
                updateMessage={updateMessage}
                city={city}
                forecastData={forecastData}
                loading={loading}
              />
            </Animated>
          ) : null}

          {/* <div className="search-section">
              <input
                type="search"
                placeholder="Voer een stadsnaam in"
                className="search-box"
                autoFocus="on"
                value={searcher}
                onChange={handleInput}
              />
              <button onClick={handleSubmit}>zoeken</button> */}
          {/* <input
                type="submit"
                value="MyLocation"
                className="CityButton"
                onClick={getMyLocation}
              /> */}
          {/* <div className="fixedButtons">
                <input
                  type="submit"
                  value="Amsterdam"
                  className="CityButton"
                  onClick={handleInputDefault}
                />
                <input
                  type="submit"
                  value="London"
                  className="CityButton"
                  onClick={handleInputDefault}
                />
                <input
                  type="submit"
                  value="New York"
                  className="CityButton"
                  onClick={handleInputDefault}
                />
                <input
                  type="submit"
                  value="Tokyo"
                  className="CityButton"
                  onClick={handleInputDefault}
                />
                <input
                  type="submit"
                  value="Paris"
                  className="CityButton"
                  onClick={handleInputDefault}
                />
                <input
                  type="submit"
                  value="Milan"
                  className="CityButton"
                  onClick={handleInputDefault}
                />

                <input
                  type="submit"
                  value="MyLocation"
                  className="CityButton"
                  onClick={getMyLocation}
                />
              </div> */}
          {/* </div> */}
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
}

// {forecastData.ready ? (
//   <ForecastResult
//     data={forecastData}
//     convertToC={convertToC}
//     convertToF={convertToF}
//     unit={unit}
//     city={city}
//   />
// ) : null}
