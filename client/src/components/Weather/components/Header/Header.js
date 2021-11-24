import React from "react";
import Search from "../Search/Search";
import "./header.css";

export default function Header({ callBack }) {
  return (
    <header className="Header">
      <h1 className="Header__title" style={{ color: "Black" }}></h1>
      <Search callBack={callBack} />
    </header>
  );
}
