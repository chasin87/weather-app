import React from "react";

import "../styles/TempUnitCurrent.css";

export default function TempUnitCurrent(props) {
  if (props.unit === "celsius") {
    return (
      <div className="temp-container">
        <div className="temp_numbers">{Math.round(props.celsius)}</div>
        °C
      </div>
    );
  } else {
    let fahrenheit = (props.celsius * 9) / 5 + 32;
    return (
      <div className="temp-container">
        <div className="temp_numbers">{Math.round(fahrenheit)}</div>
        °F
      </div>
    );
  }
}
