import React from "react";
import "./NextRoundHeader.scss";

const Header = ({ currentRound, gameMode }) => (
  <div className="next-round-info__header">
    <div className="game-info">
      <div className="game-info__content">
        <h1>DUELS</h1>
        <h2>{gameMode}</h2>
      </div>
    </div>
    <div className="current-round">ROUND {currentRound}</div>
  </div>
);

export default React.memo(Header);
