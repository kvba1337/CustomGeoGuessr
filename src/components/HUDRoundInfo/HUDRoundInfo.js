import React from "react";
import { useSelector } from "react-redux";
import "./HUDRoundInfo.scss";

const HUDRoundInfo = () => {
  const { currentRound, totalRounds } = useSelector((state) => state.game);

  return (
    <div className="round-hud">
      <div className="round-hud__title">ROUND</div>
      <div className="round-hud__info">
        {currentRound} / {totalRounds}
      </div>
    </div>
  );
};

export default HUDRoundInfo;
