import React from "react";
import { geolocated } from "react-geolocated";

//Icons
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineSync } from "react-icons/ai";
import { WiCelsius } from "react-icons/wi";
import { WiFahrenheit } from "react-icons/wi";
import { IconContext } from "react-icons";
import { MdLocationSearching } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { RiHome2Line } from "react-icons/ri";

import "../styles/Nav.css";

const Nav = ({
  convertToC,
  convertToF,
  unit,
  locationer,
  setActiveClass,
  activeClass,
  setUpdateMessage,
  setOpenMenu,
  openMenu,
  setNext,
  next,
  setLoadingMessage,
  setCity,
  city,
  isGeolocationEnabled,
  IsGeolocationAvailable,
}) => {
  function getMyLocation() {
    if (
      navigator.geolocation &&
      navigator.permissions &&
      navigator.permissions.query
    ) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            locationer();
            setLoadingMessage(true);
          } else if (result.state === "prompt") {
            console.log(result.state);
            locationer();
            setLoadingMessage(true);
          } else if (result.state === "denied") {
            alert(
              "To receive location-based weather information, you must allow to share your location. check your privacy settings in your browser."
            );
            console.log(result.state);
            setCity(city);
          }
          result.onchange = function () {
            console.log(result.state);
            if (result.state === "denied") {
              alert(
                "To receive location-based weather information, you must allow to share your location. check your privacy settings in your browser."
              );
            }
          };
        });
    } else if (navigator.geolocation) {
      locationer();
    } else {
      alert("Sorry Not available!");
    }

    if (!isGeolocationEnabled && !IsGeolocationAvailable) {
      alert(
        "To receive location-based weather information, you must allow to share your location. check your privacy settings in your browser."
      );
    }
  }

  function getRefresh() {
    setUpdateMessage(true);
  }

  function nextQuote() {
    setNext(next + 1);
  }

  return (
    <nav>
      <div className="icons_nav">
        <div className="icons_menu_nav">
          <div className={` ${openMenu ? "iconsNav_remove" : "menuIcon"}`}>
            <AiOutlineMenu
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            />
          </div>
          <div style={{ margin: "10px" }}>
            {activeClass === false ? (
              <AiOutlineSearch
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setActiveClass(!activeClass);
                }}
              />
            ) : (
              <RiHome2Line
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setActiveClass(!activeClass);
                }}
              />
            )}
          </div>

          <div style={{ margin: "10px" }}>
            <AiOutlineSync style={{ cursor: "pointer" }} onClick={getRefresh} />
          </div>

          <div style={{ margin: "10px" }}>
            <MdLocationSearching
              style={{ cursor: "pointer" }}
              onClick={getMyLocation}
            />
          </div>
          <div style={{ margin: "10px" }}>
            <BsCardText style={{ cursor: "pointer" }} onClick={nextQuote} />
          </div>
        </div>

        <div className="icons_weather_nav">
          {unit === "celsius" ? (
            <IconContext.Provider
              value={{ size: "3rem", className: "global-class-name" }}
            >
              <div style={{ marginTop: "-10px" }}>
                <WiFahrenheit
                  style={{ cursor: "pointer" }}
                  onClick={convertToF}
                />
              </div>
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{ size: "3rem", className: "global-class-name" }}
            >
              <div style={{ marginTop: "-10px" }}>
                <WiCelsius style={{ cursor: "pointer" }} onClick={convertToC} />
              </div>
            </IconContext.Provider>
          )}
        </div>
      </div>
    </nav>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity,
  },
  watchPosition: false,
  userDecisionTimeout: null,
  suppressLocationOnMount: false,
  geolocationProvider: navigator.geolocation,
  isOptimisticGeolocationEnabled: true,
})(Nav);
