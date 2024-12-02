import React from "react";
import { useSelector } from "react-redux";
import NextRoundPlayer from "../NextRoundPlayer/NextRoundPlayer";
import "./NextRoundPlayers.scss";

const Players = ({ username, avatar, opponent, currentRound }) => {
  const { settings } = useSelector((state) => state.game);
  const multiplier = 1.0 + Math.max(0, Math.floor(currentRound - 4)) * 0.5;

  const formatMultiplier = (value) => {
    return Number.isInteger(value) ? value.toString() : value.toFixed(1);
  };

  return (
    <div className="players">
      <NextRoundPlayer avatar={avatar} username={username} />
      <div className="vs-section">
        <div className="current-round">ROUND {currentRound}</div>
        {currentRound === 1 || settings?.gameType !== "battle" ? (
          <div className="vs">VS</div>
        ) : (
          <div className="multiplier">
            {formatMultiplier(multiplier)}x DAMAGE
          </div>
        )}
      </div>
      <NextRoundPlayer avatar={opponent.avatar} username={opponent.username} />
    </div>
  );
};

export default React.memo(Players);
