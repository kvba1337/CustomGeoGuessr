import React from "react"
import "./MultiplayerButtons.scss"

const MultiplayerButtons = ({ onHostClick, onJoinClick }) => {
  return (
    <div className="buttons">
      <button
        className="button button-secondary button-lg"
        onClick={onJoinClick}
      >
        <div className="button-wrapper">
          <span className="button-label">Join Another Party</span>
        </div>
      </button>
      <button className="button button-primary button-lg" onClick={onHostClick}>
        <div className="button-wrapper">
          <span className="button-label">Host a Party</span>
        </div>
      </button>
    </div>
  )
}

export default React.memo(MultiplayerButtons)
