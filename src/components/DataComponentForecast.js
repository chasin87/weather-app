import React from "react";
import "../styles/DataComponentForecast.css";

export default function DataComponentForecast(props) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[props.date.getDay()];
  let time = props.dt_text.slice(11, 13) * 1;
  let date = props.dt_text.slice(8, 10);
  let mont = props.dt_text.slice(4, 7);

  // const correctFormat = () => {
  //   const date = new Date(props.res * 1000);
  //   return date.toLocaleDateString("nl-EU");
  // };

  return (
    <div className="dataComponent">
      <div className="update_day">{day}</div>
      <div style={{ fontSize: "1rem" }}>
        {date}
        {mont}
      </div>
      <div>{time}:00</div>

      {/* <div className="date_format"> {correctFormat()}</div> */}
    </div>
  );
}
