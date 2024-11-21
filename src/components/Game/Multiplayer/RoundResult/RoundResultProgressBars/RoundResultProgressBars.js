import React from "react";
import ProgressBar from "@components/Game/Common/ProgressBar/ProgressBar";
import "./RoundResultProgressBars.scss";

const RoundResultProgressBars = ({
  avatar,
  userResult,
  opponentResult,
  opponentAvatar,
  settings,
}) => {
  const { gameType } = settings;
  const maxValue = gameType === "battle" ? 6000 : 5000;

  return (
    <div className="progress-bars">
      <div className="progress-bar-container ">
        <img src={avatar} alt="User Avatar" className="avatar" />
        <ProgressBar
          value={
            gameType === "battle"
              ? userResult?.remainingHp
              : userResult?.score || 0
          }
          max={maxValue}
          player="user"
          showValue={gameType === "battle"}
        />
      </div>
      <div className="progress-bar-container">
        <ProgressBar
          value={
            gameType === "battle"
              ? opponentResult?.remainingHp
              : opponentResult?.score || 0
          }
          max={maxValue}
          player="opponent"
          showValue={gameType === "battle"}
        />
        <img src={opponentAvatar} alt="Opponent Avatar" className="avatar" />
      </div>
    </div>
  );
};

export default React.memo(RoundResultProgressBars);
