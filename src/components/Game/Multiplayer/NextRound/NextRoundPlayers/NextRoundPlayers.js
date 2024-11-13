import React from "react";
import NextRoundPlayer from "../NextRoundPlayer/NextRoundPlayer";
import "./NextRoundPlayers.scss";

const Players = ({ currentRound, username, avatar, opponent }) => (
  <div className="players">
    <div className="current-round">ROUND {currentRound}</div>
    <NextRoundPlayer avatar={avatar} username={username} />
    <p className="vs">VS</p>
    <NextRoundPlayer avatar={opponent.avatar} username={opponent.username} />
  </div>
);

export default React.memo(Players);
