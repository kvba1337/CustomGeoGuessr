import React from "react";
import "./RoundResultButtons.scss";

const RoundResultButtons = ({
  handleViewSummary,
  handleNextRound,
  isLastRound,
}) => (
  <>
    {isLastRound ? (
      <button className="view-summary-btn" onClick={handleViewSummary}>
        View Summary
      </button>
    ) : (
      <button className="next-round-btn" onClick={handleNextRound}>
        Next Round
      </button>
    )}
  </>
);

export default RoundResultButtons;
