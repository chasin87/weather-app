import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import Searchresult from "./SearchResult";
import axios from "axios";
import "../styles/Weather.css";
import Geocode from "react-geocode";
import ForecastResult from "./ForecastResult";

import sun from "./../images/sun.png";

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
  }, []);

  Geocode.setApiKey(process.env.REACT_APP_WEATHER_API_GOOGLE);
  Geocode.setLanguage("en");
  Geocode.enableDebug();

  const locationer = () => {
    setLoading(true);
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
          setCity(address);
          setLoading(false);
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
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fa2f4fbdafdf3f04f1bd27d34de450a4&units=metric`
        );

        handleResponse(result);
      } catch (error) {
        console.log("Please check the city name!", error);
      }
    };
    city && fetchData();
  }, [city]);

  useEffect(() => {
    city &&
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${later}&lon=${lnger}&exclude=current,minutely,hourly,alerts&appid=fa2f4fbdafdf3f04f1bd27d34de450a4&units=metric`
        )
        .then((responses) => {
          forecastResponse(responses.data.daily);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Please check the city name!", error);
        });
  }, [later, lnger, city]);

  function handleSubmit() {
    setLoading(true);
    setCity(searcher);
    setSearcher("");
    setLoading(false);
  }

  function handleInput(event) {
    event.preventDefault();
    setSearcher(event.target.value);
  }

  // function handleInputDefault(event) {
  //   setCity(event.target.value);
  // }

  return (
    <Container className="Container">
      {loading ? (
        <img className="loadingImg" src={sun} alt="sun" />
      ) : (
        <div className="container_data">
          {city ? (
            <div className="Weather">
              {weatherData.ready ? (
                <Searchresult
                  data={weatherData}
                  locationer={locationer}
                  handleInput={handleInput}
                  handleSubmit={handleSubmit}
                  searcher={searcher}
                  convertToC={convertToC}
                  convertToF={convertToF}
                  unit={unit}
                />
              ) : null}
              {forecastData.ready ? (
                <ForecastResult
                  data={forecastData}
                  convertToC={convertToC}
                  convertToF={convertToF}
                  unit={unit}
                  city={city}
                />
              ) : null}

              {/* <section className="Header">Hoe is het weer vandaag?</section> */}
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
            <img className="loadingImg" src={sun} alt="sun" />
          )}
        </div>
      )}
    </Container>
  );
}
