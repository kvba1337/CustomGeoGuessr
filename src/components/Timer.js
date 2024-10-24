import React, { memo, useMemo } from "react";
import "../styles/components/Timer.scss";

const dashArray = 467.347;

const Timer = ({ timer, totalTime }) => {
  const formatTime = useMemo(() => {
    const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
    const seconds = String(timer % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [timer]);

  const dashOffset = useMemo(
    () => (dashArray * (totalTime - timer)) / totalTime,
    [timer, totalTime]
  );

  const timerClass = timer <= 10 ? "timer warning" : "timer";

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
