import React, { memo, useMemo } from "react";
import "./HUDTimer.scss";

const dashArray = 467.347;

const Timer = ({ remainingTime, totalTime }) => {
  const formatTime = useMemo(() => {
    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
    const seconds = String(remainingTime % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [remainingTime]);

  const dashOffset = useMemo(
    () => (dashArray * (totalTime - remainingTime)) / totalTime,
    [remainingTime, totalTime]
  );

  const timerClass = remainingTime <= 10 ? "timer warning" : "timer";

  return (
    <div className={timerClass}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          width="100%"
          height="100%"
          d="M38.56,4C19.55,4,4,20.2,4,40c0,19.8,15.55,36,34.56,36h122.88C180.45,76,196,59.8,196,40
          c0-19.8-15.55-36-34.56-36H38.56z"
          fill="none"
          stroke="#8a2be2"
          strokeWidth="8"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          className="timer-path"
        />
        <text
          x="100"
          y="45"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="40"
          fill="#fff"
        >
          {formatTime}
        </text>
      </svg>
    </div>
  );
};

export default memo(Timer);
