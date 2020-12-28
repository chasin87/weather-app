import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import Searchresult from "./Searchresult";
import axios from "axios";
import "./Weather.css";
import Geocode from "react-geocode";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(false);
  const [searcher, setSearcher] = useState();
  // const [current, setCurrent] = useState(null);
  function handleResponse(response) {
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      city: response.data.name,
      country: response.data.sys.country,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
    });
  }

  Geocode.setApiKey("AIzaSyC52pIR56WEwdey8vyPuvcSRZ9lEgxfHdM");
  Geocode.setLanguage("en");

  Geocode.enableDebug();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = ("Latitude is :", position.coords.latitude);
      let lng = ("Longitude is :", position.coords.longitude);
      console.log(lat, lng);
      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          const address = response.results[0].address_components[3].long_name;
          setCity(address);
          console.log(address);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }, []);

  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = ("Latitude is :", position.coords.latitude);
      let lng = ("Longitude is :", position.coords.longitude);
      console.log(lat, lng);
      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          const address = response.results[0].address_components[3].long_name;
          setCity(address);
          console.log(address);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  };

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
      )
      .then((response) => {
        handleResponse(response);
      })
      .catch((error) => {
        alert("Please check the city name!", error);
      });
  }, [city]);

  console.log("city", city);

  function handleSubmit(event) {
    setCity(searcher);
  }

  function handleInput(event) {
    event.preventDefault();
    setSearcher(event.target.value);
  }

  function handleInputDefault(event) {
    setCity(event.target.value);
  }

  return (
    <Container className="Container" maxWidth="sm">
      {city ? (
        <div className="Weather">
          {weatherData.ready ? <Searchresult data={weatherData} /> : null}
          <section className="Header">Hoe is het weer vandaag?</section>
          <div className="search-section">
            <input
              type="search"
              placeholder="Voer een stadsnaam in"
              className="search-box"
              autoFocus="on"
              onChange={handleInput}
            />
            <button onClick={handleSubmit}>zoeken</button>

            <div className="fixedButtons">
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
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading....</h1>
      )}
    </Container>
  );
}
