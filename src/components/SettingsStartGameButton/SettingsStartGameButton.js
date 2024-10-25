import React from "react";
import "./SettingsStartGameButton.scss";

const StartGameButton = ({ onClick }) => {
  return (
    <button className="settings-btn" onClick={onClick}>
      Start Game
    </button>
  );
};

export default StartGameButton;
