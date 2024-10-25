import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getRandomLocations } from "../utils/getRandomLocations";
import { calculateDistanceToTarget } from "../utils/calculateDistanceToTarget";
import { convertDistanceToUnits } from "../utils/convertDistanceToUnits";
import { calculateRoundScore } from "../utils/calculateRoundScore";

const useGameLogic = () => {
  const location = useLocation();
  const {
    selectedMap,
    selectedTotalRounds,
    selectedTimeLimit,
    selectedGameMode,
  } = location.state;

  const [remainingTime, setRemainingTime] = useState(selectedTimeLimit);
  const [currentRound, setCurrentRound] = useState(1);
  const [roundScore, setRoundScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [distanceToTarget, setDistanceToTarget] = useState(null);
  const [gameLocations, setGameLocations] = useState([]);
  const [userAllGuessedLocations, setUserAllGuessedLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [userGuessLocation, setUserGuessLocation] = useState(null);
  const [isGuessChosen, setIsGuessChosen] = useState(false);
  const [isGuessSubmitted, setIsGuessSubmitted] = useState(false);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [isLastRound, setIsLastRound] = useState(false);
  const [isGameSummaryVisible, setIsGameSummaryVisible] = useState(false);

  const streetViewRef = useRef(null);

  const handleGuessSubmit = useCallback(() => {
    let roundScore = 0;
    let distanceToTarget = null;

    if (isGuessChosen) {
      const distance = calculateDistanceToTarget(
        userGuessLocation,
        currentLocation
      );
      distanceToTarget = convertDistanceToUnits(distance);
      roundScore = calculateRoundScore(distance, selectedMap.factor);
      setDistanceToTarget(distanceToTarget);
      setUserAllGuessedLocations((prev) => [...prev, userGuessLocation]);
    }

    setRoundScore(roundScore);
    setTotalScore((prev) => prev + roundScore);
    setIsGuessSubmitted(true);
    setIsRoundOver(true);

    if (currentRound === selectedTotalRounds) {
      setIsLastRound(true);
    } else {
      loadNextLocation();
    }
  }, [
    isGuessChosen,
    userGuessLocation,
    currentLocation,
    selectedMap.factor,
    currentRound,
    selectedTotalRounds,
  ]);

  const handleNextRound = useCallback(() => {
    if (currentRound < selectedTotalRounds) {
      setCurrentRound((prev) => prev + 1);
      setCurrentLocation(gameLocations[currentRound]);
      setUserGuessLocation(null);
      setRemainingTime(selectedTimeLimit);
    }

    setTimeout(() => {
      setIsRoundOver(false);
      setIsGuessChosen(false);
      setIsGuessSubmitted(false);
    }, 2000);
  }, [currentRound, selectedTotalRounds, gameLocations, selectedTimeLimit]);

  const handleReturnButtonClick = () => {
    if (streetViewRef.current && currentLocation) {
      streetViewRef.current.setPosition(currentLocation);
    }
  };

  const loadNextLocation = () => {
    if (streetViewRef.current && gameLocations[currentRound + 1]) {
      streetViewRef.current.setPosition(gameLocations[currentRound + 1]);
    }
  };

  const handleViewSummary = () => {
    setIsGameSummaryVisible(true);
  };

  const handleMapClick = (event) => {
    if (!isGuessSubmitted) {
      setUserGuessLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
      setIsGuessChosen(true);
    }
  };

  const getStreetViewOptions = useMemo(() => {
    const baseOptions = {
      addressControl: false,
      panControl: true,
      motionTracking: false,
      motionTrackingControl: false,
      enableCloseButton: false,
      fullscreenControl: false,
      showRoadLabels: false,
    };

    switch (selectedGameMode) {
      case "move":
        return {
          ...baseOptions,
          zoomControl: true,
          clickToGo: true,
          scrollwheel: true,
          linksControl: true,
        };
      case "noMove":
        return {
          ...baseOptions,
          zoomControl: true,
          clickToGo: false,
          scrollwheel: true,
          linksControl: false,
        };
      case "NMPZ":
        return {
          ...baseOptions,
          zoomControl: false,
          clickToGo: false,
          scrollwheel: false,
          linksControl: false,
        };
      default:
        return {};
    }
  }, [selectedGameMode]);

  const handleNMPZMode = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (selectedMap && selectedTotalRounds) {
      const randomLocations = getRandomLocations(
        selectedMap.locationsList,
        selectedTotalRounds
      );
      setGameLocations(randomLocations);
    }
  }, [selectedMap, selectedTotalRounds]);

  useEffect(() => {
    if (gameLocations.length > 0) {
      setCurrentLocation(gameLocations[0]);
    }
  }, [gameLocations]);

  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      handleGuessSubmit();
    }
  }, [remainingTime, handleGuessSubmit]);

  return {
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
    setUserGuessLocation,
    setIsGuessChosen,
    handleMapClick,
    getStreetViewOptions,
    handleNMPZMode,
  };
};

export default useGameLogic;
