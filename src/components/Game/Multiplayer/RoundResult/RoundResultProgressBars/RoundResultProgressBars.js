import React, { useState, useEffect } from "react";
import ProgressBar from "@components/Game/Common/ProgressBar/ProgressBar";
import "./RoundResultProgressBars.scss";

const RoundResultProgressBars = ({
  avatar,
  userResult,
  opponentResult,
  opponentAvatar,
  settings,
  username,
  opponentUsername,
}) => {
  const { gameType } = settings;
  const maxValue = gameType === "battle" ? 6000 : 5000;
  const [userHp, setUserHp] = useState(userResult?.prevHp);
  const [opponentHp, setOpponentHp] = useState(opponentResult?.prevHp);

  useEffect(() => {
    if (gameType === "battle") {
      setTimeout(() => {
        setUserHp(userResult?.remainingHp || 0);
        setOpponentHp(opponentResult?.remainingHp || 0);
      }, 6300);
    }
  }, [gameType, userResult, opponentResult]);
  return (
    <div className="progress-bars">
      <div className="progress-bar-container">
        <img src={avatar} alt="User Avatar" className="avatar" />
        <div className="progress-bar-wrapper">
          <ProgressBar
            value={gameType === "battle" ? userHp : userResult?.score || 0}
            max={maxValue}
            player="user"
            showValue={true}
          />
          <span className="player-name">{username}</span>
        </div>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar-wrapper">
          <ProgressBar
            value={
              gameType === "battle" ? opponentHp : opponentResult?.score || 0
            }
            max={maxValue}
            player="opponent"
            showValue={true}
            reverse={true}
          />
          <span className="player-name">{opponentUsername}</span>
        </div>
        <img src={opponentAvatar} alt="Opponent Avatar" className="avatar" />
      </div>
    </div>
  );
};

export default React.memo(RoundResultProgressBars);
