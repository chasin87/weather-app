import React from "react";

import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineSync } from "react-icons/ai";
import { WiCelsius } from "react-icons/wi";
import { WiFahrenheit } from "react-icons/wi";
import { IconContext } from "react-icons";
import { MdLocationSearching } from "react-icons/md";
import { BsCardText } from "react-icons/bs";

import "../styles/Nav.css";

const Nav = ({
  convertToC,
  convertToF,
  unit,
  locationer,
  setActiveClass,
  activeClass,
  renew,
  setRenew,
  setUpdateMessage,
  updateMessage,
  setOpenMenu,
  openMenu,
  setNext,
  next,
  setLoadingMessage,
}) => {
  function getMyLocation() {
    locationer();
    setLoadingMessage(true);
  }
  function getRefresh() {
    setRenew(true);
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
            <AiOutlineSearch
              style={{ cursor: "pointer" }}
              onClick={() => {
                setActiveClass(!activeClass);
              }}
            />
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

export default Nav;
