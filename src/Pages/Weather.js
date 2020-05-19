import React, { useState } from "react";
import { Container } from "@material-ui/core";
import Searchresult from "./Searchresult";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  function handleResponse(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      city: response.data.name,
      country: response.data.sys.country,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
    });
  }

  function search() {
    const apiKey = "e1f6338909b15ed65e927cc411d39098";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleInput(event) {
    setCity(event.target.value);
  }

  return (
    <Container className="Container" maxWidth="sm">
      <div className="Weather">
        <section className="Header">Hoe is het weer vandaag?</section>
        <div className="search-section">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Voer een stadsnaam in"
              className="search-box"
              autoFocus="on"
              onChange={handleInput}
            />

            <input type="submit" value="zoeken" className="button" />
            {weatherData.ready ? <Searchresult data={weatherData} /> : null}
            <div className="fixedButtons">
              <input
                type="submit"
                value="Amsterdam"
                className="CityButton"
                onClick={handleInput}
              />
              <input
                type="submit"
                value="London"
                className="CityButton"
                onClick={handleInput}
              />
              <input
                type="submit"
                value="New York"
                className="CityButton"
                onClick={handleInput}
              />
              <input
                type="submit"
                value="Tokyo"
                className="CityButton"
                onClick={handleInput}
              />
              <input
                type="submit"
                value="Paris"
                className="CityButton"
                onClick={handleInput}
              />
              <input
                type="submit"
                value="Milan"
                className="CityButton"
                onClick={handleInput}
              />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
