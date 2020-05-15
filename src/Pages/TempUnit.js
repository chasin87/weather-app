import React, { useState } from "react";

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
      <div className="temp-container">
        {Math.round(props.celsius)}
        <span>
          {" "}
          °C |{" "}
          <a href="/" onClick={convertToF}>
            °F
          </a>
        </span>
      </div>
    );
  } else {
    let fahrenheit = (props.celsius * 9) / 5 + 32;
    return (
      <div className="temp-container">
        {Math.round(fahrenheit)}
        <span>
          <a href="/" onClick={convertToC}>
            °C{" "}
          </a>
          | °F
        </span>
      </div>
    );
  }
}
