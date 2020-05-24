import React from "react";
import "./Preloader.css";

const Preloader = props => {
  return (
    <div>
      <h1 className="mt-5">Now loading</h1>
      <ul className="loader">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default Preloader;
