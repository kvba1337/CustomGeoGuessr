import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { GoogleMap } from "@react-google-maps/api";
import CustomMarker from "../CustomMarker/CustomMarker";
import CustomPolyline from "../CustomPolyline/CustomPolyline";
import correctLocation from "../../assets/images/icons/correct-location.png";
import "./GameResultSummary.scss";

const GameResultSummary = ({
  userResults,
  opponentResults,
  gameLocations,
  onContinue,
}) => {
  const { username, avatar } = useSelector((state) => state.user);
  const { opponent } = useSelector((state) => state.room);
  const [selectedRound, setSelectedRound] = useState(gameLocations.length - 1);
  const mapRef = useRef(null);

  useEffect(() => {
    if (selectedRound !== null && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      const location = gameLocations[selectedRound];
      bounds.extend(location);
      if (
        userResults[selectedRound] &&
        userResults[selectedRound].guessedLocation
      ) {
        bounds.extend(userResults[selectedRound].guessedLocation);
      }
      if (
        opponentResults[selectedRound] &&
        opponentResults[selectedRound].guessedLocation
      ) {
        bounds.extend(opponentResults[selectedRound].guessedLocation);
      }
      mapRef.current.fitBounds(bounds);
    }
  }, [selectedRound, gameLocations, userResults, opponentResults]);

  const handleRowClick = (roundIndex) => {
    setSelectedRound(roundIndex);
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;
    const bounds = new window.google.maps.LatLngBounds();
    const location = gameLocations[selectedRound];
    bounds.extend(location);
    if (
      userResults[selectedRound] &&
      userResults[selectedRound].guessedLocation
    ) {
      bounds.extend(userResults[selectedRound].guessedLocation);
    }
    if (
      opponentResults[selectedRound] &&
      opponentResults[selectedRound].guessedLocation
    ) {
      bounds.extend(opponentResults[selectedRound].guessedLocation);
    }
    map.fitBounds(bounds);
  };

  const options = {
    disableDefaultUI: true,
    minZoom: 2,
    clickableIcons: false,
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
          options={options}
          onLoad={handleMapLoad}
        >
          {selectedRound !== null && (
            <>
              <CustomMarker
                location={gameLocations[selectedRound]}
                icon={correctLocation}
              />
              {userResultsArray[selectedRound] &&
                userResultsArray[selectedRound].guessedLocation && (
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
              {opponentResultsArray[selectedRound] &&
                opponentResultsArray[selectedRound].guessedLocation && (
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
        <table className="summary-table">
          <thead>
            <tr>
              <th></th>
              <th>YOUR SCORE</th>
              <th>{opponent.username.toUpperCase()} SCORE</th>
              <th>YOUR TOTAL SCORE</th>
              <th>{opponent.username.toUpperCase()} TOTAL SCORE</th>
            </tr>
          </thead>
          <tbody>
            {gameLocations.map((_, index) => (
              <tr key={index} onClick={() => handleRowClick(index)}>
                <td className="round">Round {index + 1}</td>
                <td className="points">
                  {userResultsArray[index]?.score || 0} points
                  <br />
                  <span className="distance">
                    {userResultsArray[index]?.distanceToTarget || "N/A"}
                  </span>
                </td>
                <td className="points">
                  {opponentResultsArray[index]?.score || 0} points
                  <br />
                  <span className="distance">
                    {opponentResultsArray[index]?.distanceToTarget || "N/A"}
                  </span>
                </td>
                <td className="points">
                  {userResultsArray
                    .slice(0, index + 1)
                    .reduce((acc, round) => acc + (round.score || 0), 0)}
                  <br />
                  <span className="gained-points">
                    +{userResultsArray[index]?.score || 0}
                  </span>
                </td>
                <td className="points">
                  {opponentResultsArray
                    .slice(0, index + 1)
                    .reduce((acc, round) => acc + (round.score || 0), 0)}
                  <br />
                  <span className="gained-points">
                    +{opponentResultsArray[index]?.score || 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="continue-btn" onClick={onContinue}>
        Continue
      </button>
    </div>
  );
};

export default GameResultSummary;
