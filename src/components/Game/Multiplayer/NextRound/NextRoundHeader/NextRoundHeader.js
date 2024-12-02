import React from "react";
import "./NextRoundHeader.scss";

const NextRoundHeader = ({ currentRound, gameMode, map }) => (
  <div className="next-round-info__header">
    <div className="game-info">
      <h1>DUELS</h1>
      <h2>{gameMode}</h2>
      <h3>{map?.title}</h3>
    </div>
  </div>
);

export default React.memo(NextRoundHeader);
