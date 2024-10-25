import React from "react";
import "./GameResultProgressBar.scss";

const ProgressBar = ({ value, max }) => (
  <div className="progress-bar-container">
    <progress value={value} max={max}></progress>
  </div>
);

export default ProgressBar;