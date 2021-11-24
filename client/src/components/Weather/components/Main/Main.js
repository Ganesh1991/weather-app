import React from "react";

import Current from "../Current/Current";
import Forecast from "../Forecast/Forecast";

import "./main.css";

export default function Main({ weatherInfo, location, date, contentState }) {
  if (contentState === "weather")
    return (
      <div className="Main">
        <Current weatherInfo={weatherInfo} location={location} date={date[0]} />
        <div className="Main__forecast">
          <Forecast weatherInfo={weatherInfo.daily[0]} date={date[0]} />
          <Forecast weatherInfo={weatherInfo.daily[1]} date={date[1]} />
          <Forecast weatherInfo={weatherInfo.daily[2]} date={date[2]} />
          <Forecast weatherInfo={weatherInfo.daily[3]} date={date[3]} />
          <Forecast weatherInfo={weatherInfo.daily[4]} date={date[4]} />
        </div>
      </div>
    );
  else if (contentState === "warning")
    return (
      <div className="Main Main--warning">
        <h2 className="Main__no-location">No location found</h2>
        <p className="Main__no-location-paragraph">
          Try informing city/town and state/country
        </p>
        <p className="Main__no-location-paragraph">Ex: São Carlos, São Paulo</p>
        <p className="Main__no-location-paragraph">Ex: Tokyo, Japan </p>
      </div>
    );
  else if (contentState === "blank") return <div className="Main"></div>;
}
