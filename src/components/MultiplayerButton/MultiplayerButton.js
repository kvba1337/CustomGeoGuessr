import React from "react";
import "./MultiplayerButton.scss";

const MultiplayerButton = ({ text, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default MultiplayerButton;
