import React from "react";
import ProgressBar from "@components/Game/Common/ProgressBar/ProgressBar";
import "./GameResultScoreItem.scss";

const GameResultScoreItem = ({
  avatar,
  username,
  score,
  maxScore,
  isWinner,
}) => (
  <div className="score-container__item">
    <div className="avatar-container">
      <img
        src={avatar}
        alt="Player"
        className={`avatar ${isWinner ? "winner" : ""}`}
      />
      <p className="username">{username}</p>
    </div>
    <div className="score-container__progress">
      <ProgressBar value={score} max={maxScore} />
      <p className="score">{score}</p>
    </div>
  </div>
);

export default React.memo(GameResultScoreItem);
