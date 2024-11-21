import React, { useState, useEffect } from "react";
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
  const [userHp, setUserHp] = useState(userResult.prevHp);
  const [opponentHp, setOpponentHp] = useState(opponentResult.prevHp);

  useEffect(() => {
    if (gameType === "battle") {
      setTimeout(() => {
        setUserHp(userResult?.remainingHp || 0);
        setOpponentHp(opponentResult?.remainingHp || 0);
      }, 5600);
    }
  }, [gameType, userResult, opponentResult]);
  return (
    <div className="progress-bars">
      <div className="progress-bar-container ">
        <img src={avatar} alt="User Avatar" className="avatar" />
        <ProgressBar
          value={gameType === "battle" ? userHp : userResult?.score || 0}
          max={maxValue}
          player="user"
          showValue={gameType === "battle"}
        />
      </div>
      <div className="progress-bar-container">
        <ProgressBar
          value={
            gameType === "battle" ? opponentHp : opponentResult?.score || 0
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
