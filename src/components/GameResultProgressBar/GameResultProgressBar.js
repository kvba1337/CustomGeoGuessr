import React from "react";
import "./GameResultProgressBar.scss";

const getProgressBarClass = (value, max) => {
  const percentage = (value / max) * 100;
  if (percentage < 33) {
    return "progress-bar--red";
  } else if (percentage < 66) {
    return "progress-bar--orange";
  } else {
    return "progress-bar--green";
  }
};

const ProgressBar = ({ value, max }) => {
  const progressBarClass = getProgressBarClass(value, max);

  return (
    <div className={`progress-bar__details ${progressBarClass}`}>
      <progress value={value} max={max}></progress>
    </div>
  );
};

export default ProgressBar;
