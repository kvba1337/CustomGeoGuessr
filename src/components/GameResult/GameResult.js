import React from "react";
import GameResultMap from "../GameResultMap/GameResultMap";
import GameResultButtons from "../GameResultButtons/GameResultButtons";
import GameResultProgressBar from "../GameResultProgressBar/GameResultProgressBar";
import "./GameResult.scss";

const GameResult = ({
  totalScore,
  totalRounds,
  userAllGuessedLocations,
  gameLocations,
}) => {
  const handlePlayAgain = () => window.location.reload();
  const handleHomeButton = () => (window.location.href = "/");

  return (
    <div className="game-result">
      <h1>Game Over</h1>
      <GameResultMap
        userAllGuessedLocations={userAllGuessedLocations}
        gameLocations={gameLocations}
      />
      <p className="points">{totalScore} points</p>
      <GameResultProgressBar value={totalScore} max={5000 * totalRounds} />
      <GameResultButtons
        handlePlayAgain={handlePlayAgain}
        handleHomeButton={handleHomeButton}
      />
    </div>
  );
};

export default GameResult;
