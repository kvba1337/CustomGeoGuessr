import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { ref, onValue, update } from "firebase/database";
import { formatTime } from "@utils/timeUtils";
import { database } from "@services/firebaseConfig";
import "./HUDTimer.scss";

const dashArray = 467.347;

const HUDTimer = () => {
  const { timeLimit, gameType } = useSelector((state) => state.game.settings);
  const { roomId } = useSelector((state) => state.room);
  const { userId } = useSelector((state) => state.user);
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const [isTimerActive, setIsTimerActive] = useState(gameType !== "battle");

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
    if (gameType === "battle") {
      const usersRef = ref(database, `rooms/${roomId}/users`);
      const unsubscribe = onValue(usersRef, (snapshot) => {
        const users = snapshot.val();
        const opponentId = Object.keys(users).find((id) => id !== userId);

        if (users[opponentId]?.hasGuessed || users[userId]?.hasGuessed) {
          setRemainingTime(15);
          setIsTimerActive(true);
        }
      });

      return () => unsubscribe();
    }
  }, [roomId, userId, gameType]);

  useEffect(() => {
    let timer;
    if (isTimerActive && remainingTime > 0) {
      timer = setInterval(handleTimeUpdate, 1000);
    }
    return () => clearInterval(timer);
  }, [handleTimeUpdate, isTimerActive, remainingTime]);

  const dashOffset = useMemo(
    () =>
      dashArray *
      (1 - remainingTime / (gameType === "battle" ? 15 : timeLimit)),
    [remainingTime, timeLimit, gameType]
  );

  if (!isTimerActive && gameType === "battle") {
    return null;
  }

  const timerClass = remainingTime <= 10 ? "timer warning" : "timer";

  return (
    <div className={timerClass}>
      <svg width="100%" height="100%" viewBox="0 0 200 80">
        <path
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
