import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import {
  GoogleMap,
  StreetViewPanorama,
  useJsApiLoader,
} from "@react-google-maps/api";
import Timer from "../components/Timer";
import MapContainer from "../components/MapContainer";
import RoundSummary from "../components/RoundSummary";
import RoundHUD from "../components/RoundHUD";
import "../styles/pages/Game.scss";

const MAX_WIDTH = 1000;
const MIN_WIDTH = 400;

const calculateDistanceToTarget = (userGuessLocation, correctLocation) => {
  const userGuessLocationGoogle = new window.google.maps.LatLng(
    userGuessLocation.lat,
    userGuessLocation.lng
  );
  const correctLocationGoogle = new window.google.maps.LatLng(
    correctLocation.lat,
    correctLocation.lng
  );

  return window.google.maps.geometry.spherical.computeDistanceBetween(
    userGuessLocationGoogle,
    correctLocationGoogle
  );
};

const convertDistanceToUnits = (distanceToTarget) => {
  const distance = parseFloat(distanceToTarget).toFixed(1);
  if (distance > 10000) {
    return `${parseInt(distance / 1000)} KM`;
  }
  if (distance > 2000) {
    return `${(distance / 1000).toFixed(1)} KM`;
  }
  return `${parseInt(distance)} M`;
};

const calculateRoundScore = (distanceToTarget, mapFactor) => {
  if (distanceToTarget < 25) {
    return 5000;
  }

  const power = (-10 * (distanceToTarget / 1000)) / mapFactor;
  const score = 5000 * Math.pow(Math.E, power);

  if (score < 0) {
    return 0;
  }

  return Math.round(score);
};

const getRandomLocations = (selectedMapLocations, selectedTotalRounds) => {
  const shuffledLocations = [...selectedMapLocations].sort(
    () => 0.5 - Math.random()
  );
  return shuffledLocations.slice(0, selectedTotalRounds);
};

const Game = () => {
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
  const [mapDimensions, setMapDimensions] = useState({
    width: 600,
    height: 400,
  });
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isEnlargeDisabled, setIsEnlargeDisabled] = useState(false);
  const [isShrinkDisabled, setIsShrinkDisabled] = useState(false);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [isLastRound, setIsLastRound] = useState(false);

  const timeoutRef = useRef(null);
  const streetViewRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleMapClick = useCallback(
    (event) => {
      if (!isGuessSubmitted) {
        setUserGuessLocation({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
        setIsGuessChosen(true);
      }
    },
    [isGuessSubmitted]
  );

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

      if (streetViewRef.current) {
        streetViewRef.current.setZoom(1);
      }
    }

    setTimeout(() => {
      setIsRoundOver(false);
      setIsGuessChosen(false);
      setIsGuessSubmitted(false);
    }, 2000);
  }, [currentRound, selectedTotalRounds, gameLocations, selectedTimeLimit]);

  const enlargeMap = useCallback(() => {
    setMapDimensions((prev) => {
      const newWidth = Math.min(prev.width + 200, MAX_WIDTH);
      setIsEnlargeDisabled(newWidth === MAX_WIDTH);
      setIsShrinkDisabled(false);
      return { width: newWidth, height: prev.height + 120 };
    });
  }, []);

  const shrinkMap = useCallback(() => {
    setMapDimensions((prev) => {
      const newWidth = Math.max(prev.width - 200, MIN_WIDTH);
      setIsShrinkDisabled(newWidth === MIN_WIDTH);
      setIsEnlargeDisabled(false);
      return { width: newWidth, height: prev.height - 120 };
    });
  }, []);

  const handleMouseHoverMap = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setIsMapExpanded(true);
  }, []);

  const handleMouseLeaveMap = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsMapExpanded(false);
    }, 1000);
  }, []);

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

  const handleNMPZMode = useCallback((event) => {
    event.stopPropagation();
  }, []);

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

  return (
    <div className="game-page">
      <Timer timer={remainingTime} totalTime={selectedTimeLimit} />
      <RoundHUD currentRound={currentRound} totalRounds={selectedTotalRounds} />

      {isLoaded && currentLocation && (
        <GoogleMap mapContainerStyle={{ width: "100%", height: "100vh" }}>
          <StreetViewPanorama
            onLoad={(panorama) => (streetViewRef.current = panorama)}
            position={currentLocation}
            visible={true}
            options={getStreetViewOptions}
          />
        </GoogleMap>
      )}

      <MapContainer
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

      <button className="return-button" onClick={handleReturnButtonClick}>
        <i className="fa-regular fa-flag"></i>
      </button>

      {isRoundOver && (
        <RoundSummary
          currentRound={currentRound}
          currentLocation={gameLocations[currentRound - 1]}
          userGuessLocation={userGuessLocation}
          roundScore={roundScore}
          distanceToTarget={distanceToTarget}
          handleNextRound={handleNextRound}
          userAllGuessedLocations={userAllGuessedLocations}
          gameLocations={gameLocations}
          isLastRound={isLastRound}
          totalRounds={selectedTotalRounds}
          totalScore={totalScore}
        />
      )}
    </div>
  );
};

export default Game;
