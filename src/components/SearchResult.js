import React from "react";
import DateComponent from "./DataComponent";
import WeatherIcon from "./WeatherIcon";
import TempUnitCurrent from "./TempUnitCurrent";

import MyLocationIcon from "@material-ui/icons/MyLocation";

import "../styles/SearchResult.css";

export default function Searchresult({
  data,
  locationer,
  handleInput,
  handleSubmit,
  searcher,
  unit,
  convertToC,
  convertToF,
}) {
  function getMyLocation() {
    locationer();
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
              <TempUnitCurrent celsius={data.temperature} unit={unit} />
            </div>
          </div>
        </div>
        <div className="inputer">
          <div className="buttons_group">
            <div onClick={getMyLocation} className="location_icon">
              <MyLocationIcon />

              <p style={{ fontSize: "0.7rem" }}>Current Location</p>
            </div>

            <div className="button_group">
              <button className="button_c" onClick={convertToC}>
                Metric: °C
              </button>
              <button className="button_f" onClick={convertToF}>
                Imperial: °F
              </button>
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
            <div className="input_city">
              <input
                id="input_basic"
                placeholder="Search city"
                onChange={handleInput}
                value={searcher}
              />
              <button className="button_search" onClick={handleSubmit}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
