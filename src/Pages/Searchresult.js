import React from "react";
import DateComponent from "./DataComponent";
import WeatherIcon from "./WeatherIcon";
import TempUnit from "./TempUnit";

export default function Searchresult(props) {
  return (
    <div className="main">
      <div className="searchresult-section">
        <div className="searched-city">
          <ul>
            <li>
              <section className="cityName">
                {props.data.city}, {props.data.country}
              </section>
            </li>
            <li>
              <DateComponent className="date" date={props.data.date} />
            </li>
          </ul>
        </div>
        <div className="row">
          <TempUnit celsius={props.data.temperature} />

          <WeatherIcon code={props.data.icon} alt={props.data.description} />
        </div>
      </div>
    </div>
  );
}
