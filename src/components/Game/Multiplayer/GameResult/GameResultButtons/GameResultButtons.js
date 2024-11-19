import React from "react";
import "./GameResultButtons.scss";

const GameResultButtons = ({ onShowSummary, onContinue }) => {
  return (
    <div className="game-result-buttons">
      <div className="game-summary-btn-container">
        <button className="game-summary-btn" onClick={onShowSummary}>
          Game Summary
        </button>
      </div>
      <div className="continue-btn-container">
        <button className="continue-btn" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default React.memo(GameResultButtons);
