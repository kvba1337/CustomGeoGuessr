import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { formatTime } from "@utils/timeUtils";
import { ref, update } from "firebase/database";

import { database } from "@services/firebaseConfig";
import "./HUDTimer.scss";

const dashArray = 467.347;

const HUDTimer = () => {
  const { timeLimit } = useSelector((state) => state.game.settings);
  const { roomId } = useSelector((state) => state.room);
  const { userId } = useSelector((state) => state.user);
  const [remainingTime, setRemainingTime] = useState(timeLimit);

  const handleTimeUpdate = useCallback(() => {
    setRemainingTime((prevTime) => {
      if (prevTime <= 1) {
        update(ref(database, `rooms/${roomId}/users/${userId}`), {
          hasGuessed: true,
        });
        return 0;
      }
      return prevTime - 1;
    });
  }, [roomId, userId]);

  useEffect(() => {
    const timer = setInterval(handleTimeUpdate, 1000);
    return () => clearInterval(timer);
  }, [handleTimeUpdate]);

  const dashOffset = useMemo(
    () => (dashArray * (timeLimit - remainingTime)) / timeLimit,
    [remainingTime, timeLimit]
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
          {formatTime(remainingTime)}
        </text>
      </svg>
    </div>
  );
};

export default React.memo(HUDTimer);
