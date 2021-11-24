import React, { useState } from "react";
import "./search.css";

export default function Search({ callBack }) {
  const [currentCity, setCurrentCity] = useState("");
  const [labelState, setLabelState] = useState("Search__label");
  const [placeholder, setPlaceholder] = useState("Enter the city");

  function handleInputChange(event) {
    if (labelState === "Search__label Search__warning") {
      setLabelState("Search__label");
      setPlaceholder("Enter the city");
    }
    setCurrentCity(event.target.value);
  }

  function handleInputClick() {
    if (labelState === "Search__label Search__warning") {
      setLabelState("Search__label");
      setPlaceholder("Enter the city");
    }
  }

  function handleButtonClick() {
    if (currentCity.trim(" ") === "") {
      setLabelState("Search__label Search__warning");
      setPlaceholder("");
    } else {
      callBack(currentCity);
      setLabelState("Search__label");
      setPlaceholder("Enter the city");
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") handleButtonClick();
    else handleInputClick();
  }

  return (
    <div className="Search">
      <label className={labelState}>
        <input
          value={currentCity}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyPress={handleKeyPress}
          className="Search__input"
          placeholder={placeholder}
        />
        {labelState === "Search__label Search__warning" && (
          <p className="Search__warning-content"> Field is empty </p>
        )}
      </label>
      <button onClick={handleButtonClick} className="Search__button">
        Search
      </button>
    </div>
  );
}
