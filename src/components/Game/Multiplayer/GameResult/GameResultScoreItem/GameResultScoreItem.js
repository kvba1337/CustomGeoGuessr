import React from "react";
import { useSelector } from "react-redux";
import ProgressBar from "@components/Game/Common/ProgressBar/ProgressBar";
import "./GameResultScoreItem.scss";

const GameResultScoreItem = ({
  avatar,
  username,
  score,
  maxScore,
  isWinner,
  reverse,
  remainingHp,
}) => {
  const { settings } = useSelector((state) => state.game);
  const { gameType } = settings;

  return (
    <div className={`score-container__item ${reverse ? "reverse" : ""}`}>
      <div
        className={`avatar-container ${
          gameType === "battle" ? "battle-mode" : ""
        }`}
      >
        <img
          src={avatar}
          alt="Player"
          className={`avatar ${isWinner ? "winner" : ""}`}
        />
        <p className="username">{username}</p>
      </div>
      {gameType !== "battle" && (
        <div className="score-container__progress">
          <ProgressBar value={score} max={maxScore} showValue={false} />
          <p className="score">{score}</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(GameResultScoreItem);
