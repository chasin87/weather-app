import React, { useState } from "react";

import "../styles/TempUnit.css";

export default function TempUnit(props) {
  const [unit, setUnit] = useState("celsius");
  function convertToF(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function convertToC(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <div className="temp-container_forecast">
        <div className="forecast_temps">
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
        <br /> Max: {Math.round(fahrenheit_max)}
        <span>
          <a href="/" onClick={convertToC}>
            °C{" "}
          </a>
          | °F
        </span>
        <br />
        Min:
        {Math.round(fahrenheit_min)}
        <span>
          {" "}
          °C |{" "}
          <a href="/" onClick={convertToF}>
            °F
          </a>
        </span>
      </div>
    );
  }
}

/* <span>
°C |
<a href="/" onClick={convertToF}>
  °F
</a>
</span>
{Math.round(props.celsius_min)}
<span>
{" "}
°C |{" "}
<a href="/" onClick={convertToF}>
  °F
</a>
</span> */
