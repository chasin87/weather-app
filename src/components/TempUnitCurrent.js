import React, { useState } from "react";

import "../styles/TempUnitCurrent.css";

export default function TempUnitCurrent(props) {
  const [unit, setUnit] = useState("celsius");
  // function convertToF(event) {
  //   event.preventDefault();
  //   setUnit("fahrenheit");
  // }

  function convertToC(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
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
        <span>
          <div className="temp_digit">
            <a href="/" onClick={convertToC}>
              °C{" "}
            </a>
            | °F
          </div>
        </span>
      </div>
    );
  }
}

/* <span>
<div className="temp_digit">
  {" "}
  °C |{" "}
  <a href="/" onClick={convertToF}>
    °F
  </a>
</div>
</span> */
