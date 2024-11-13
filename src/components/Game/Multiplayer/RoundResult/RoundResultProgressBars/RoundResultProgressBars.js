import React from "react";
import ProgressBar from "@components/Game/Common/ProgressBar/ProgressBar";
import "./RoundResultProgressBars.scss";

const RoundResultProgressBars = ({
  avatar,
  userResult,
  opponentResult,
  opponentAvatar,
}) => (
  <div className="progress-bars">
    <div className="progress-bar-container progress-bar-container--left">
      <img src={avatar} alt="User Avatar" className="avatar" />
      <ProgressBar value={userResult?.score || 0} max={5000} player="user" />
    </div>
    <div className="progress-bar-container progress-bar-container--right">
      <ProgressBar
        value={opponentResult?.score || 0}
        max={5000}
        player="opponent"
      />
      <img src={opponentAvatar} alt="Opponent Avatar" className="avatar" />
    </div>
  </div>
);

export default React.memo(RoundResultProgressBars);
