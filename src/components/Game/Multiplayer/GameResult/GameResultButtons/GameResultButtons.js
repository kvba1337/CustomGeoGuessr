import React from "react";
import "./GameResultButtons.scss";

const GameResultButtons = ({ onShowSummary, onContinue }) => {
  return (
    <div className="game-result-buttons">
      <button className="game-summary-btn" onClick={onShowSummary}>
        Game Summary
      </button>
      <button className="continue-btn" onClick={onContinue}>
        Continue
      </button>
    </div>
  );
};

export default React.memo(GameResultButtons);
