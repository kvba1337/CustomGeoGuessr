import React from "react";
import "./NextRoundHeader.scss";

const Header = ({ gameMode }) => (
  <div className="next-round-info__header">
    <h1>DUELS</h1>
    <h2>{gameMode}</h2>
  </div>
);

export default React.memo(Header);
