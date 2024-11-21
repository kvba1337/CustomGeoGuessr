import React, { memo, useEffect, useState } from "react";
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
  }, [value]);

  return (
    <div className={`progress-bar ${progressBarModifier}`}>
      <progress value={progressValue} max={max}></progress>
      {showValue && (
        <span className="progress-value">{Math.floor(progressValue)}</span>
      )}
    </div>
  );
};

export default memo(ProgressBar);
