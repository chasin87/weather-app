import React, { useState, useEffect } from "react";
import DateComponent from "./DataComponent";
import WeatherIcon from "./WeatherIcon";
import TempUnitCurrent from "./TempUnitCurrent";
import ForecastResult from "./ForecastResult";
import Nav from "./Nav";
import Loading from "./Loading";
import { quotes } from "./WeatherQuotes";

import { BsXSquare } from "react-icons/bs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { Animated } from "react-animated-css";

import "../styles/SearchResult.css";
import "../styles/WeatherQuotes.css";

export default function Searchresult({
  data,
  locationer,
  handleInput,
  handleSubmit,
  searcher,
  unit,
  convertToC,
  convertToF,
  setActiveClass,
  activeClass,
  setUpdateMessage,
  updateMessage,
  setCity,
  city,
  forecastData,
  loading,
  permissions,
  setLoadingMessage,
  loadingMessage,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [toDisplay, setToDisplay] = useState("main");
  const [displayQuote, setDisplayQuote] = useState(false);
  const [next, setNext] = useState(0);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    setAnim(false);
    setTimeout(() => {
      setDisplayQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setAnim(true);
    }, 100);
  }, [next]);

  return (
    <div className="searchresult">
      <div className={`menu_side ${openMenu ? "menu_side_active" : ""}`}>
        <div className="close_button">
          <BsXSquare
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpenMenu(false);
            }}
          />
        </div>
        <div className="menu_items">
          <div
            className="menu_item"
            onClick={() => {
              setToDisplay("main");
              setOpenMenu(false);
            }}
          >
            Main
          </div>

          <div
            className="menu_item"
            onClick={() => {
              setToDisplay("forecast");
              setOpenMenu(false);
            }}
          >
            Forecast
          </div>
          <div
            className="menu_item"
            onClick={() => {
              setToDisplay("otherInfo");
              setOpenMenu(false);
            }}
          >
            Other Info
          </div>
        </div>
        <div className="developed_By">
          <a
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "#5c5c5c",
            }}
            href="https://www.linkedin.com/in/yasin-y/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developed by Yasin Yuksek
          </a>{" "}
        </div>
      </div>

      <div
        className={`cityName ${activeClass ? "cityNameActive" : ""}  ${
          openMenu ? "cityName_menu" : ""
        }`}
      >
        <div className="Nav_in_city">
          <Nav
            convertToC={convertToC}
            convertToF={convertToF}
            unit={unit}
            locationer={locationer}
            setActiveClass={setActiveClass}
            activeClass={activeClass}
            setUpdateMessage={setUpdateMessage}
            setOpenMenu={setOpenMenu}
            openMenu={openMenu}
            setNext={setNext}
            next={next}
            setLoadingMessage={setLoadingMessage}
            permissions={permissions}
            setCity={setCity}
            city={city}
          />
        </div>
        <Animated
          animationIn="fadeInUp"
          animationOut="zoomOutDown"
          animationInDuration={1000}
          animationOutDuration={1000}
          isVisible={updateMessage}
        >
          <div
            style={{
              fontSize: "2vh",
              marginBottom: "20px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            All data updated
          </div>
        </Animated>
        <div className="all_Info">
          {loading ? (
            <Loading />
          ) : (
            <div>
              {activeClass ? (
                <Animated
                  animationIn="fadeInUp"
                  animationOut="zoomOutDown"
                  animationInDuration={1000}
                  animationOutDuration={1000}
                  isVisible={activeClass}
                >
                  <div className="searchBar">
                    <input
                      type="text"
                      id="input_basic"
                      placeholder="Search city"
                      onChange={handleInput}
                      value={searcher}
                    />
                    <button className="button_search" onClick={handleSubmit}>
                      Search
                    </button>
                  </div>
                </Animated>
              ) : (
                <div>
                  {(() => {
                    if (toDisplay === "main") {
                      return (
                        <div>
                          {loadingMessage ? (
                            <Loading />
                          ) : (
                            <Animated
                              animationIn="fadeInUp"
                              animationOut="zoomOutDown"
                              animationInDuration={1000}
                              animationOutDuration={1000}
                              isVisible={!activeClass}
                            >
                              <div
                                className={`some_text ${
                                  openMenu ? "some_text_active" : ""
                                }`}
                              >
                                <Animated
                                  animationIn="fadeInUp"
                                  animationOut="zoomOutDown"
                                  animationInDuration={1000}
                                  animationOutDuration={1000}
                                  isVisible={anim}
                                >
                                  <div className="quote_text">
                                    {displayQuote.quote}
                                  </div>
                                  <div className="quote_by">
                                    {displayQuote.by}
                                  </div>
                                </Animated>
                              </div>
                              <div className="temperature">
                                <div className="today">Today</div>
                                <TempUnitCurrent
                                  celsius={data.temperature}
                                  unit={unit}
                                />
                              </div>
                              <div className="city">
                                {data.city},{data.country}
                              </div>
                              <DateComponent
                                className="date"
                                date={data.date}
                              />
                            </Animated>
                          )}
                        </div>
                      );
                    } else if (toDisplay === "forecast") {
                      return (
                        <Animated
                          animationIn="fadeInUp"
                          animationOut="zoomOutDown"
                          animationInDuration={1000}
                          animationOutDuration={1000}
                          isVisible={!activeClass}
                        >
                          <ForecastResult
                            data={forecastData}
                            convertToC={convertToC}
                            convertToF={convertToF}
                            unit={unit}
                            city={city}
                          />
                        </Animated>
                      );
                    } else if (toDisplay === "otherInfo") {
                      return (
                        <div className="other_info">
                          <Animated
                            animationIn="fadeInUp"
                            animationOut="zoomOutDown"
                            animationInDuration={1000}
                            animationOutDuration={1000}
                            isVisible={!activeClass}
                          >
                            {unit === "celsius" ? (
                              <div>
                                <p>
                                  <span>Feels Like: </span> {data.feels_like} °C
                                </p>
                                <p>
                                  <span>Temp Max: </span>
                                  {Math.round(data.temp_max)} °C
                                </p>
                                <p>
                                  <span>Temp Min: </span>{" "}
                                  {Math.round(data.temp_min)} °C
                                </p>
                                <p>
                                  <span>Wind Speed: </span>
                                  {data.wind_speed} meter/sec
                                </p>
                                <p>
                                  <span>Wind Direction: </span>
                                  {data.wind_degree} degrees
                                </p>
                              </div>
                            ) : (
                              <div>
                                <p>
                                  <span>Feels Like: </span>
                                  {Math.round(data.feels_like * 9) / 5 + 32} °F
                                </p>
                                <p>
                                  <span>Temp Max: </span>
                                  {Math.round(data.temp_max * 9) / 5 + 32} °F
                                </p>
                                <p>
                                  <span>Temp Min: </span>
                                  {Math.round(data.temp_min * 9) / 5 + 32} °F
                                </p>
                                <p>
                                  <span>Wind Speed: </span>
                                  {Math.round(data.wind_speed * 2.236936)}{" "}
                                  miles/sec
                                </p>
                                <p>
                                  <span>Wind Direction: </span>
                                  {data.wind_degree} degrees
                                </p>
                              </div>
                            )}
                          </Animated>
                        </div>
                      );
                    }
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="right_side">
        <div className="right_side_top">
          <div className="right_text">Humidity</div>
          <Animated
            animationIn="rotateIn"
            animationOut="rotateOut"
            animationInDuration={1000}
            animationOutDuration={1000}
            isVisible={true}
          >
            <CircularProgressbar
              value={data.humidity}
              text={`${data.humidity}%`}
              styles={buildStyles({
                textColor: "#5B5B5B",
                trailColor: "#E1E1E1",
                backgroundColor: "#48484A",
              })}
            />
          </Animated>
        </div>
        <div className="right_side_bottom">
          <div className="icon">
            <div className="right_text">Now</div>
            <Animated
              animationIn="flipInY"
              animationOut="flipOutX"
              animationInDuration={3000}
              animationOutDuration={1000}
              isVisible={true}
            >
              <WeatherIcon code={data.icon} alt={data.description} />
            </Animated>
            <div className="description_weather">{data.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
