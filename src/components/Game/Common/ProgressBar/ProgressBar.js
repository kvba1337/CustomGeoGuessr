import React, { memo } from "react";
import "./ProgressBar.scss";

const getProgressBarModifier = (value, max) => {
  const percentage = (value / max) * 100;
  if (percentage < 33) {
    return "progress-bar--low";
  } else if (percentage < 66) {
    return "progress-bar--medium";
  } else {
    return "progress-bar--high";
  }
};

const ProgressBar = ({ value, max, showValue }) => {
  const progressBarModifier = getProgressBarModifier(value, max);

  return (
    <div className={`progress-bar ${progressBarModifier}`}>
      <progress value={value} max={max}></progress>
      {showValue && <span className="progress-value">{value}</span>}
    </div>
  );
};

export default memo(ProgressBar);
