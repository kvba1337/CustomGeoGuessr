import React from "react";
import { useSelector } from "react-redux";
import ProgressBar from "@components/Game/Common/ProgressBar/ProgressBar";
import "./HUDPlayerProgress.scss";

const PlayerProgress = ({ isReversed }) => {
  const { avatar, username } = useSelector((state) => state.user);
  const { opponent } = useSelector((state) => state.room);
  const { currentRound, roundResults } = useSelector((state) => state.game);

  const userHp =
    currentRound === 1 ? 6000 : roundResults?.userResult?.remainingHp || 6000;
  const opponentHp =
    currentRound === 1
      ? 6000
      : roundResults?.opponentResult?.remainingHp || 6000;

  const displayAvatar = isReversed ? opponent.avatar : avatar;
  const displayUsername = isReversed ? opponent.username : username;
  const displayHp = isReversed ? opponentHp : userHp;

  return (
    <div className={`player-progress ${isReversed ? "reverse" : ""}`}>
      <img
        src={displayAvatar}
        alt={`${displayUsername}'s Avatar`}
        className="player-avatar"
      />
      <div className="progress-wrapper">
        <ProgressBar
          value={displayHp}
          max={6000}
          showValue={true}
          reverse={isReversed}
        />
        <span className="player-name">{displayUsername}</span>
      </div>
    </div>
  );
};

export default React.memo(PlayerProgress);
