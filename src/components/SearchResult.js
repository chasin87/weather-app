import React from "react";
import DateComponent from "./DataComponent";
import WeatherIcon from "./WeatherIcon";
import TempUnitCurrent from "./TempUnitCurrent";

import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import MyLocationIcon from "@material-ui/icons/MyLocation";

import "../styles/SearchResult.css";

export default function Searchresult({ data, setSet }) {
  function getMyLocation() {
    setSet(true);
  }

  return (
    <div className="main">
      <div className="searchresult">
        <div className="cityName">
          {data.city},{/* {data.data.country}, */}
          <DateComponent className="date" date={data.date} />
          <div className="description_weather">{data.description}</div>
          <div className="icon">
            <WeatherIcon code={data.icon} alt={data.description} />
            <div className="temparture">
              <TempUnitCurrent celsius={data.temperature} />
            </div>
          </div>
        </div>
        <div className="inputer">
          <div className="buttons_group">
            <div
              onClick={getMyLocation}
              style={{ color: "#EC6E4C", width: "20%", cursor: "pointer" }}
            >
              <MyLocationIcon />

              <p style={{ fontSize: "0.7rem" }}>Current Location</p>
            </div>
            <div style={{ width: "80%" }}>
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
              >
                <Button style={{ fontSize: "0.6rem" }}>Metric: °C</Button>
                <Button style={{ fontSize: "0.6rem" }}>Imperial: °F</Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="other_info">
            <p>
              <span>Feels Like:</span> {data.feels_like}°C
            </p>
            <p>
              <span>Temp Max: </span>
              {data.temp_max}°C
            </p>
            <p>
              <span>Temp Min:</span> {data.temp_min}°C
            </p>
            <p>
              <span>Wind Speed: </span>
              {data.wind_speed} meter/sec
            </p>
            <p>
              <span>Wind Direction:</span>
              {data.wind_degree} degrees
            </p>
          </div>
          <div className="input_city">
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <Button variant="contained" color="primary">
              Primary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
