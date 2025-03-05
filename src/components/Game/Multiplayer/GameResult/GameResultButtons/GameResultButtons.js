import React from "react"
import "./GameResultButtons.scss"

const GameResultButtons = ({ onShowSummary, onContinue }) => {
  return (
    <div className="game-result-buttons">
      <div className="game-summary-btn-container">
        <button
          className="button button-secondary button-lg"
          onClick={onShowSummary}
        >
          <div className="button-wrapper">
            <span className="button-label">Game Summary</span>
          </div>
        </button>
      </div>
      <div className="continue-btn-container">
        <button
          className="button button-primary button-lg"
          onClick={onContinue}
        >
          <div className="button-wrapper">
            <span className="button-label">Continue</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default React.memo(GameResultButtons)
