import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import axios from "axios";

import "./weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState(undefined);
  const [location, setLocation] = useState({});
  const [date, setDate] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState({});
  const [contentState, setContentState] = useState("blank");
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [loader, setLoader] = useState(undefined);

  function searchCity(target) {
    setCity(target);
    setDate(dateBuilder(new Date()));
    setLoaderVisibility(true);
  }

  useEffect(() => {
    if (city !== "" && loaderVisibility) {
      setContentState("blank");
      setLoader(<div className="loading"></div>);
      axios
        .get("https://api.opencagedata.com/geocode/v1/json? ", {
          params: {
            key: '912185780698457db7a5c98c2d3c403d',
            q: city
          }
        })
        .then((response) => {
          if (
            response.data.results.length === 0 ||
            (response.data.results[0].components.city === undefined &&
              response.data.results[0].components.town === undefined)
          ) {
            setLoader(null);
            setCoordinates(undefined);
            setContentState("warning");
            setTimeout(() => {
              if (contentState === "warning" || contentState === "blank")
                setContentState("blank");
            }, 5000);
          } else {
            setCoordinates(response.data.results[0].geometry);
            setLocation({
              city: response.data.results[0].components.city,
              town: response.data.results[0].components.town,
              state: response.data.results[0].components.state_code,
              country: response.data.results[0].components.country_code
            });
          }
        })
        .catch((error) => {
          catchError(error);
          setLoader(null);
          setCoordinates(undefined);
          setContentState("warning");
          setTimeout(() => {
            if (contentState === "warning" || contentState === "blank")
              setContentState("blank");
          }, 5000);
        });
      setLoaderVisibility(false);
    }
  }, [city, loaderVisibility, loader, contentState]);

  useEffect(() => {
    if (coordinates !== undefined) {
      axios
        .get("https://api.openweathermap.org/data/2.5/onecall?", {
          params: {
            lat: coordinates.lat,
            lon: coordinates.lng,
            exclude: "minutely,hourly,alerts",
            appid: 'b50f36333803a650a88c6775933041c6',
            units: "metric"
          }
        })
        .then((response) => {
          setLoader(null);
          setWeatherInfo(response.data);
          setContentState("weather");
        })
        .catch((error) => catchError(error));
    }
  }, [coordinates]);

  function catchError(error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }

  function dateBuilder(d) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const date = [];
    
    for (let count = 0; count < 5; count++) {
      if (d.getDay() + count < 7)
        date[count] = d.getDay() + count;
      else if (d.getDay() + count === 7)
        date[count] = 0;
      else if (d.getDay() + count === 8)
        date[count] = 1;
      else if (d.getDay() + count === 9)
        date[count] = 2;
      else if (d.getDay() + count === 10)
        date[count] = 3;
    }

    return [
      days[date[0]],
      days[date[1]],
      days[date[2]],
      days[date[3]],
      days[date[4]]
    ];
  }

  return (
    <div className="App">
      <div className="App__container">
        <Header callBack={searchCity} />
        {loader}
        <Main
          weatherInfo={weatherInfo}
          location={location}
          date={date}
          contentState={contentState}
        />
      </div>
    </div>
  );
}
