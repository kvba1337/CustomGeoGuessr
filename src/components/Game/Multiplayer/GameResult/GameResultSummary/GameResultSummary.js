import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { GoogleMap } from "@react-google-maps/api";

import CustomMarker from "@components/Game/Common/CustomMarker/CustomMarker";
import CustomPolyline from "@components/Game/Common/CustomPolyline/CustomPolyline";
import correctLocation from "@assets/images/icons/correct-location.png";
import { extendMapBounds, getMapOptions } from "@utils/mapUtils";
import GameResultSummaryTable from "../GameResultSummaryTable/GameResultSummaryTable";
import "./GameResultSummary.scss";

const GameResultSummary = ({
  userResults,
  opponentResults,
  gameLocations,
  onContinue,
}) => {
  const { avatar } = useSelector((state) => state.user);
  const { opponent } = useSelector((state) => state.room);
  const { selectedMap } = useSelector((state) => state.game);
  const [selectedRound, setSelectedRound] = useState(gameLocations.length - 1);
  const mapRef = useRef(null);

  const fitBounds = useCallback(() => {
    if (selectedRound !== null && mapRef.current) {
      extendMapBounds(
        mapRef.current,
        [gameLocations[selectedRound]],
        [userResults[selectedRound]],
        [opponentResults[selectedRound]],
        selectedMap
      );
    }
  }, [selectedRound, gameLocations, userResults, opponentResults, selectedMap]);

  useEffect(() => {
    fitBounds();
  }, [fitBounds]);

  const handleRowClick = (roundIndex) => {
    setSelectedRound(roundIndex);
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;
    fitBounds();
  };

  const userResultsArray = Array.isArray(userResults) ? userResults : [];
  const opponentResultsArray = Array.isArray(opponentResults)
    ? opponentResults
    : [];

  return (
    <div className="game-result-summary">
      <div className="game-result-summary__header">Game Summary</div>
      <div className="summary-map">
        <GoogleMap
          id="summary-map"
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={getMapOptions()}
          onLoad={handleMapLoad}
        >
          {selectedRound !== null && (
            <>
              <CustomMarker
                location={gameLocations[selectedRound]}
                icon={correctLocation}
              />
              {userResultsArray[selectedRound]?.guessedLocation && (
                <>
                  <CustomMarker
                    location={userResultsArray[selectedRound].guessedLocation}
                    icon={avatar}
                  />
                  <CustomPolyline
                    location={userResultsArray[selectedRound].guessedLocation}
                    location2={gameLocations[selectedRound]}
                  />
                </>
              )}
              {opponentResultsArray[selectedRound]?.guessedLocation && (
                <>
                  <CustomMarker
                    location={
                      opponentResultsArray[selectedRound].guessedLocation
                    }
                    icon={opponent.avatar}
                  />
                  <CustomPolyline
                    location={
                      opponentResultsArray[selectedRound].guessedLocation
                    }
                    location2={gameLocations[selectedRound]}
                  />
                </>
              )}
            </>
          )}
        </GoogleMap>
      </div>
      <div className="summary-table-container">
        <GameResultSummaryTable
          gameLocations={gameLocations}
          userResultsArray={userResultsArray}
          opponentResultsArray={opponentResultsArray}
          opponentUsername={opponent.username}
          onRowClick={handleRowClick}
        />
      </div>
      <div className="continue-btn-container">
        <button className="continue-btn" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default React.memo(GameResultSummary);
