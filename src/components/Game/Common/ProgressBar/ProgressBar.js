import React, { memo, useEffect, useState } from "react";
import "./ProgressBar.scss";

const getProgressBarModifier = (value, max) => {
  const percentage = (value / max) * 100;
  if (percentage < 15) {
    return "progress-bar--low";
  } else if (percentage < 50) {
    return "progress-bar--medium";
  } else {
    return "progress-bar--high";
  }
};

const ProgressBar = ({ value, max, showValue, reverse }) => {
  const [progressValue, setProgressValue] = useState(value);
  const progressBarModifier = getProgressBarModifier(progressValue, max);

  useEffect(() => {
    const animateProgress = (start, end, duration) => {
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const current = Math.max(
          start + (end - start) * (progress / duration),
          end
        );
        setProgressValue(current);
        if (progress < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    animateProgress(progressValue, value, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div
      className={`progress-bar ${progressBarModifier} ${
        reverse ? "progress-bar--reverse" : ""
      }`}
    >
      <progress value={progressValue} max={max}></progress>
      {showValue && (
        <span className="progress-value">{Math.floor(progressValue)}</span>
      )}
    </div>
  );
};

export default memo(ProgressBar);
