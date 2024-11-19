import React from "react";
import "./RoundResultHeader.scss";

const RoundResultHeader = ({ gameMode, currentRound }) => (
  <div className="round-result-header">
    <div className="game-info">
      <h1>DUELS</h1>
      <h2>{gameMode}</h2>
    </div>
    <div className="current-round">ROUND {currentRound}</div>
  </div>
);

export default React.memo(RoundResultHeader);
