import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import useGameLogic from "../../hooks/useGameLogic";
import useMiniMapLogic from "../../hooks/useMiniMapLogic";
import StreetViewMap from "../../components/StreetViewMap/StreetViewMap";
import HUDTimer from "../../components/HUDTimer/HUDTimer";
import HUDRoundInfo from "../../components/HUDRoundInfo/HUDRoundInfo";
import HUDReturnButton from "../../components/HUDReturnButton/HUDReturnButton";
import MiniMapContainer from "../../components/MiniMapContainer/MiniMapContainer";
import RoundResult from "../../components/RoundResult/RoundResult";
import GameResult from "../../components/GameResult/GameResult";
import "./Game.scss";

const Game = () => {
  const location = useLocation();
  const {
    selectedMap,
    selectedTotalRounds,
    selectedTimeLimit,
    selectedGameMode,
  } = location.state;

  const {
    remainingTime,
    currentRound,
    roundScore,
    totalScore,
    distanceToTarget,
    gameLocations,
    userAllGuessedLocations,
    currentLocation,
    userGuessLocation,
    isGuessChosen,
    isGuessSubmitted,
    isRoundOver,
    isLastRound,
    isGameSummaryVisible,
    streetViewRef,
    handleGuessSubmit,
    handleNextRound,
    handleReturnButtonClick,
    handleViewSummary,
    handleMapClick,
    getStreetViewOptions,
    handleNMPZMode,
  } = useGameLogic();

  const {
    mapDimensions,
    isMapExpanded,
    isEnlargeDisabled,
    isShrinkDisabled,
    enlargeMap,
    shrinkMap,
    handleMouseHoverMap,
    handleMouseLeaveMap,
  } = useMiniMapLogic();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return (
    <div className="game-page">
      <HUDTimer remainingTime={remainingTime} totalTime={selectedTimeLimit} />
      <HUDRoundInfo
        currentRound={currentRound}
        totalRounds={selectedTotalRounds}
      />
      <HUDReturnButton onClick={handleReturnButtonClick} />

      <StreetViewMap
        isLoaded={isLoaded}
        currentLocation={currentLocation}
        getStreetViewOptions={getStreetViewOptions}
        streetViewRef={streetViewRef}
      />

      <MiniMapContainer
        isMapExpanded={isMapExpanded}
        mapDimentions={mapDimensions}
        handleMouseHoverMap={handleMouseHoverMap}
        handleMouseLeaveMap={handleMouseLeaveMap}
        isLoaded={isLoaded}
        handleMapClick={handleMapClick}
        userGuessLocation={userGuessLocation}
        isGuessSubmitted={isGuessSubmitted}
        defaultMapPosition={selectedMap.defaultMapPosition}
        defaultZoom={selectedMap.zoomLevel}
        enlargeMap={enlargeMap}
        shrinkMap={shrinkMap}
        isEnlargeDisabled={isEnlargeDisabled}
        isShrinkDisabled={isShrinkDisabled}
        isGuessChosen={isGuessChosen}
        handleGuessSubmit={handleGuessSubmit}
        currentRound={currentRound}
      />

      {selectedGameMode === "NMPZ" && (
        <div className="transparent-overlay" onClick={handleNMPZMode}></div>
      )}

      {isRoundOver && (
        <RoundResult
          currentRound={currentRound}
          currentLocation={gameLocations[currentRound - 1]}
          userGuessLocation={userGuessLocation}
          roundScore={roundScore}
          distanceToTarget={distanceToTarget}
          handleNextRound={handleNextRound}
          userAllGuessedLocations={userAllGuessedLocations}
          gameLocations={gameLocations}
          isLastRound={isLastRound}
          onViewSummary={handleViewSummary}
        />
      )}

      {isGameSummaryVisible && (
        <GameResult
          totalScore={totalScore}
          totalRounds={selectedTotalRounds}
          userAllGuessedLocations={userAllGuessedLocations}
          gameLocations={gameLocations}
        />
      )}
    </div>
  );
};

export default Game;
