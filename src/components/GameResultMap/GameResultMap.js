import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { GoogleMap } from "@react-google-maps/api";
import CustomMarker from "../CustomMarker/CustomMarker";
import CustomPolyline from "../CustomPolyline/CustomPolyline";
import correctLocation from "../../assets/images/icons/correct-location.png";
import "./GameResultMap.scss";

const GameResultMap = ({ userResults, opponentResults }) => {
  const { gameLocations, selectedMap } = useSelector((state) => state.game);
  const { username, avatar } = useSelector((state) => state.user);
  const { opponent } = useSelector((state) => state.room);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      gameLocations.forEach((location, index) => {
        bounds.extend(location);
        if (userResults[index] && userResults[index].guessedLocation) {
          bounds.extend(userResults[index].guessedLocation);
        }
        if (opponentResults[index] && opponentResults[index].guessedLocation) {
          bounds.extend(opponentResults[index].guessedLocation);
        }
      });
      if (
        !userResults.some((result) => result.guessedLocation) &&
        !opponentResults.some((result) => result.guessedLocation)
      ) {
        mapRef.current.setCenter(gameLocations[0]);
        mapRef.current.setZoom(selectedMap.zoomLevel);
      } else {
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [gameLocations, userResults, opponentResults, selectedMap]);

  const handleMapLoad = (map) => {
    mapRef.current = map;
    const bounds = new window.google.maps.LatLngBounds();
    gameLocations.forEach((location, index) => {
      bounds.extend(location);
      if (userResults[index] && userResults[index].guessedLocation) {
        bounds.extend(userResults[index].guessedLocation);
      }
      if (opponentResults[index] && opponentResults[index].guessedLocation) {
        bounds.extend(opponentResults[index].guessedLocation);
      }
    });
    if (
      !userResults.some((result) => result.guessedLocation) &&
      !opponentResults.some((result) => result.guessedLocation)
    ) {
      map.setCenter(gameLocations[0]);
      map.setZoom(selectedMap.zoomLevel);
    } else {
      map.fitBounds(bounds);
    }
  };

  const options = {
    disableDefaultUI: true,
    minZoom: 2,
    clickableIcons: false,
  };

  return (
    <div className="game-result-map">
      <GoogleMap
        id="result-map"
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={options}
        onLoad={handleMapLoad}
      >
        {gameLocations.map((location, index) => (
          <React.Fragment key={index}>
            <CustomMarker location={location} icon={correctLocation} />
            {userResults[index] && userResults[index].guessedLocation && (
              <>
                <CustomMarker
                  location={userResults[index].guessedLocation}
                  icon={avatar}
                />
                <CustomPolyline
                  location={userResults[index].guessedLocation}
                  location2={location}
                />
              </>
            )}
            {opponentResults[index] &&
              opponentResults[index].guessedLocation && (
                <>
                  <CustomMarker
                    location={opponentResults[index].guessedLocation}
                    icon={opponent.avatar}
                  />
                  <CustomPolyline
                    location={opponentResults[index].guessedLocation}
                    location2={location}
                  />
                </>
              )}
          </React.Fragment>
        ))}
      </GoogleMap>
    </div>
  );
};

export default GameResultMap;
