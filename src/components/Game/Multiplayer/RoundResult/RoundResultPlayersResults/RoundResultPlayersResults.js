import React, { useEffect, useState } from "react";
import { calculateDamage } from "@utils/gameUtils";
import "./RoundResultPlayersResults.scss";

const RoundResultPlayersResults = ({
  userResult,
  opponentResult,
  currentRound,
}) => {
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [isUserWinner, setIsUserWinner] = useState(false);
  const [isOpponentWinner, setIsOpponentWinner] = useState(false);
  const [userHitDirection, setUserHitDirection] = useState("");
  const [opponentHitDirection, setOpponentHitDirection] = useState("");
  const [damage, setDamage] = useState(null);

  useEffect(() => {
    const animateScore = (start, end, duration, setScore) => {
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const current = Math.min(
          start + (end - start) * (progress / duration),
          end
        );
        setScore(Math.floor(current));
        if (progress < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const userScoreTimeout = setTimeout(() => {
      animateScore(0, userResult?.score || 0, 1000, setUserScore);
    }, 2500);

    const opponentScoreTimeout = setTimeout(() => {
      animateScore(0, opponentResult?.score || 0, 1000, setOpponentScore);
    }, 2500);

    const winnerTimeout = setTimeout(() => {
      if (userResult?.score > opponentResult?.score) {
        setIsUserWinner(true);
        setUserHitDirection("hit-right");
        setDamage(
          calculateDamage(userResult.score, opponentResult.score, currentRound)
        );
      } else if (opponentResult?.score > userResult?.score) {
        setIsOpponentWinner(true);
        setOpponentHitDirection("hit-left");
        setDamage(
          calculateDamage(opponentResult.score, userResult.score, currentRound)
        );
      }
    }, 3500);

    return () => {
      clearTimeout(userScoreTimeout);
      clearTimeout(opponentScoreTimeout);
      clearTimeout(winnerTimeout);
    };
  }, [userResult, opponentResult, currentRound]);

  const handleAnimationEnd = (winner) => {
    if (winner === "user") {
      setUserScore(damage);
    } else if (winner === "opponent") {
      setOpponentScore(damage);
    }
  };

  return (
    <div className="results">
      <div className="results__distance">
        <p className="player-result">{userResult?.distanceToTarget || 0}</p>
        <p className="separator">DISTANCE FROM LOCATION</p>
        <p className="player-result">{opponentResult?.distanceToTarget || 0}</p>
      </div>
      <div className="results__score">
        <p
          className={`player-score ${
            isUserWinner ? "winner" : "loser"
          } ${userHitDirection}`}
          onAnimationEnd={() => handleAnimationEnd("user")}
        >
          {userScore}
        </p>
        <p className="separator">ROUND SCORE</p>
        <p
          className={`player-score ${
            isOpponentWinner ? "winner" : "loser"
          } ${opponentHitDirection}`}
          onAnimationEnd={() => handleAnimationEnd("opponent")}
        >
          {opponentScore}
        </p>
      </div>
    </div>
  );
};

export default React.memo(RoundResultPlayersResults);
