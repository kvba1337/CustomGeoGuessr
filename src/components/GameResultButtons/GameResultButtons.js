import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetGame, resetGameState } from "../../redux/actions/gameActions";
import GameResultSummary from "../GameResultSummary/GameResultSummary";

import "./GameResultButtons.scss";

const GameResultButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useSelector((state) => state.room);
  const [showSummary, setShowSummary] = useState(false);
  
  const handleContinue = async () => {
    await dispatch(resetGame(roomId));
    dispatch(resetGameState());

    navigate("/multiplayer");
  };

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  if (showSummary) {
    return <GameResultSummary onContinue={handleContinue} />;
  }

  return (
    <div className="game-result-buttons">
      <button className="game-summary-btn" onClick={handleShowSummary}>Game Summary</button>
      <button className="continue-btn" onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default GameResultButtons;