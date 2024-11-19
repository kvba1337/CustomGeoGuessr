import React from "react";
import "./NextRoundHeader.scss";

const NextRoundHeader = ({ currentRound, gameMode }) => (
  <div className="next-round-info__header">
    <div className="game-info">
      <h1>DUELS</h1>
      <h2>{gameMode}</h2>
    </div>
    <div className="current-round">ROUND {currentRound}</div>
  </div>
);

export default React.memo(NextRoundHeader);
