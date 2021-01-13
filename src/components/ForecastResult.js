import React from "react";
import DataComponentForecast from "./DataComponentForecast";
import WeatherIconForecast from "./WeatherIconForecast";
import TempUnit from "./TempUnit";
// import Moment from "react-moment";

import "../styles/ForecastResult.css";

export default function ForecastResult(props) {
  const result = props.data.responses;

  return (
    result && (
      <div className="main_forecast-flexbox">
        {result.map((res) => {
          return (
            <div className="forecast_box" key={res.dt}>
              <div className="forecast_box_element">
                <DataComponentForecast
                  className="date"
                  date={new Date(res.dt * 1000)}
                  res={res.dt}
                  dt_text={res.dt_txt}
                />

                <WeatherIconForecast
                  code={res.weather.map((resIcon) => {
                    return resIcon.icon;
                  })}
                  alt={res.weather.map((resAlt) => {
                    return resAlt.description;
                  })}
                />
                <TempUnit celsius_max={res.main.temp_max} unit={props.unit} />
              </div>
            </div>
          );
        })}
      </div>
    )
  );
}
