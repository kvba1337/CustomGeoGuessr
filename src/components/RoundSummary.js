import React, { useState, memo } from "react";
import ResultMap from "./ResultMap";
import ResultMapSummary from "./ResultMapSummary";
import "../styles/components/RoundSummary.scss";

const PlayAgainButtons = ({ handlePlayAgain, handleHomeButton }) => (
  <>
    <button className="play-again-btn" onClick={handlePlayAgain}>
      Play Again
    </button>
    <button className="home-btn" onClick={handleHomeButton}>
      Home
    </button>
  </>
);

const NextRoundButtons = ({
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

const RoundSummary = ({
  currentRound,
  currentLocation,
  userGuessLocation,
  roundScore,
  totalScore,
  distanceToTarget,
  handleNextRound,
  userAllGuessedLocations,
  gameLocations,
  isLastRound,
  totalRounds,
}) => {
  const [isGameSummaryVisible, setIsGameSummaryVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleViewSummary = () => setIsGameSummaryVisible(true);
  const handlePlayAgain = () => window.location.reload();
  const handleHomeButton = () => (window.location.href = "/");

  const handleNextRoundWithFadeOut = () => {
    setIsFadingOut(true);
    handleNextRound();
    setTimeout(() => {
      setIsFadingOut(false);
    }, 2000);
  };

  return (
    <div className={`round-summary ${isFadingOut ? "fade-out" : ""}`}>
      {!isFadingOut && (
        <>
          <h1>
            {isGameSummaryVisible ? "Game Over" : `Round ${currentRound}`}
          </h1>
          {isGameSummaryVisible ? (
            <ResultMapSummary
              userAllGuessedLocations={userAllGuessedLocations}
              gameLocations={gameLocations}
            />
          ) : (
            <ResultMap
              currentLocation={currentLocation}
              userGuessLocation={userGuessLocation}
              isGameSummaryVisible={isGameSummaryVisible}
              userAllGuessedLocations={userAllGuessedLocations}
              gameLocations={gameLocations}
            />
          )}
          <p className="points">
            {isGameSummaryVisible
              ? `${totalScore} points`
              : `${roundScore} points`}
          </p>
          <div className="progress-bar-container">
            <progress
              value={isGameSummaryVisible ? totalScore : roundScore}
              max={isGameSummaryVisible ? 5000 * totalRounds : 5000}
            ></progress>
          </div>

          {!isGameSummaryVisible && (
            <p className="distance">
              Your guess was{" "}
              <span className="distance-container">{distanceToTarget}</span>{" "}
              from the correct location
            </p>
          )}

          {isGameSummaryVisible ? (
            <PlayAgainButtons
              handlePlayAgain={handlePlayAgain}
              handleHomeButton={handleHomeButton}
            />
          ) : (
            <NextRoundButtons
              handleViewSummary={handleViewSummary}
              handleNextRound={handleNextRoundWithFadeOut}
              isLastRound={isLastRound}
            />
          )}
        </>
      )}
    </div>
  );
};

export default memo(RoundSummary);
