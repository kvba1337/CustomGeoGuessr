import React from "react";
import "./MiniMapGuessButton.scss";

const MiniMapGuessButton = ({ isGuessChosen, handleGuessSubmit }) => {
  return (
    <button
      className={`submit-guess-btn ${isGuessChosen ? "" : "disabled"}`}
      onClick={isGuessChosen ? handleGuessSubmit : null}
    >
      {isGuessChosen ? "GUESS" : "PLACE YOUR PIN ON THE MAP"}
    </button>
  );
};

export default MiniMapGuessButton;
