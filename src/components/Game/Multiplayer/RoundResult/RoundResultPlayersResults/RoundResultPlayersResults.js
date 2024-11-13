import React from "react";
import "./RoundResultPlayersResults.scss";

const RoundResultPlayersResults = ({ userResult, opponentResult }) => (
  <div className="results">
    <div className="results__distance">
      <p className="player-result">{userResult?.distanceToTarget || 0}</p>
      <p className="separator">DISTANCE FROM LOCATION</p>
      <p className="player-result">{opponentResult?.distanceToTarget || 0}</p>
    </div>
    <div className="results__score">
      <p className="player-score">{userResult?.score || 0}</p>
      <p className="separator">ROUND SCORE</p>
      <p className="player-score">{opponentResult?.score || 0}</p>
    </div>
  </div>
);

export default React.memo(RoundResultPlayersResults);
