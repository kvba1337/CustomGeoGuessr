import React from "react";
import "./GameResultButtons.scss";

const GameResultButtons = ({ handlePlayAgain, handleHomeButton }) => (
  <>
    <button className="play-again-btn" onClick={handlePlayAgain}>
      Play Again
    </button>
    <button className="home-btn" onClick={handleHomeButton}>
      Home
    </button>
  </>
);

export default GameResultButtons;
