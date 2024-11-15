import React from "react";
import NextRoundPlayer from "../NextRoundPlayer/NextRoundPlayer";
import "./NextRoundPlayers.scss";

const Players = ({ username, avatar, opponent }) => (
  <div className="players">
    <NextRoundPlayer avatar={avatar} username={username} />
    <div className="vs">VS</div>
    <NextRoundPlayer avatar={opponent.avatar} username={opponent.username} />
  </div>
);

export default React.memo(Players);
