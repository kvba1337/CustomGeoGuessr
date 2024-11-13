import React from "react";
import "./RoundResultHeader.scss";

const RoundResultHeader = ({ gameMode, currentRound }) => (
  <div className="round-result-header">
    <h1>DUELS</h1>
    <h2>{gameMode}</h2>
    <h3>ROUND {currentRound}</h3>
  </div>
);

export default React.memo(RoundResultHeader);
