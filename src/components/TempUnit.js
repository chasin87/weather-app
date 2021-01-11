import React from "react";

import "../styles/TempUnit.css";

export default function TempUnit(props) {
  if (props.unit === "celsius") {
    return (
      <div className="temp-container_forecast">
        <div className="forecast_temps_forecast">
          <div className="forecast_temps_cels_max">
            {Math.round(props.celsius_max)}°
          </div>
          <div className="forecast_temps_cels_min">
            {Math.round(props.celsius_min)}°
          </div>
        </div>
      </div>
    );
  } else {
    let fahrenheit_max = (props.celsius_max * 9) / 5 + 32;
    let fahrenheit_min = (props.celsius_min * 9) / 5 + 32;

    return (
      <div className="temp-container_forecast">
        <div className="forecast_temps_forecast">
          <div className="forecast_temps_cels_max">
            {Math.round(fahrenheit_max)}°
          </div>

          <div className="forecast_temps_cels_min">
            {Math.round(fahrenheit_min)}°
          </div>
        </div>
      </div>
    );
  }
}
