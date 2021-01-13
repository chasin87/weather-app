import React from "react";
import "../styles/DataComponentForecast.css";

export default function DataComponentForecast(props) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[props.date.getDay()];
  let time = props.dt_text.slice(11, 13) * 1;

  // const correctFormat = () => {
  //   const date = new Date(props.res * 1000);
  //   return date.toLocaleDateString("nl-EU");
  // };

  return (
    <div className="dataComponent">
      <div className="update_day">{day}</div>
      <div>{time}:00</div>
      {/* <div className="date_format"> {correctFormat()}</div> */}
    </div>
  );
}
