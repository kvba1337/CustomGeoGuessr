import React from "react";
import RoundResultMap from "../RoundResultMap/RoundResultMap";
import RoundResultButtons from "../RoundResultButtons/RoundResultButtons";
import GameResultProgressBar from "../GameResultProgressBar/GameResultProgressBar";
import useFadeOut from "../../hooks/useFadeOut";
import "./RoundResult.scss";

const RoundResult = ({
  currentRound,
  currentLocation,
  userGuessLocation,
  roundScore,
  distanceToTarget,
  handleNextRound,
  userAllGuessedLocations,
  gameLocations,
  isLastRound,
  onViewSummary,
}) => {
  const [isFadingOut, triggerFadeOut] = useFadeOut();

  const handleNextRoundWithFadeOut = () => {
    triggerFadeOut(handleNextRound);
  };

  return (
    <div className={`round-result ${isFadingOut ? "fade-out" : ""}`}>
      {!isFadingOut && (
        <>
          <h1>Round {currentRound}</h1>
          <RoundResultMap
            currentLocation={currentLocation}
            userGuessLocation={userGuessLocation}
            userAllGuessedLocations={userAllGuessedLocations}
            gameLocations={gameLocations}
          />
          <p className="points">{roundScore} points</p>
          <GameResultProgressBar value={roundScore} max={5000} />
          <p className="distance">
            Your guess was{" "}
            <span className="distance-container">{distanceToTarget}</span> from
            the correct location
          </p>
          <RoundResultButtons
            handleViewSummary={onViewSummary}
            handleNextRound={handleNextRoundWithFadeOut}
            isLastRound={isLastRound}
          />
        </>
      )}
    </div>
  );
};

export default RoundResult;