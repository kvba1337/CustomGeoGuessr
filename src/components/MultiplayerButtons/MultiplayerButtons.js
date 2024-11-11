import React from "react";
import MultiplayerButton from "../MultiplayerButton/MultiplayerButton";
import "./MultiplayerButtons.scss";

const MultiplayerButtons = ({ onHostClick, onJoinClick }) => {
  return (
    <div className="buttons">
      <MultiplayerButton text="JOIN" onClick={onJoinClick} />
      <MultiplayerButton text="HOST" onClick={onHostClick} />
    </div>
  );
};

export default MultiplayerButtons;
