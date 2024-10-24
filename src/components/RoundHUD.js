import React from "react";
import "../styles/components/RoundHUD.scss";

const RoundHUD = ({ currentRound, totalRounds }) => {
  return (
    <div className="round-hud">
      <div className="round-hud__title">ROUND</div>
      <div className="round-hud__info">
        {currentRound} / {totalRounds}
      </div>
    </div>
  );
};

export default RoundHUD;
