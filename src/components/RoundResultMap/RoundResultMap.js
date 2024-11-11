import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { GoogleMap } from "@react-google-maps/api";
import CustomMarker from "../CustomMarker/CustomMarker";
import CustomPolyline from "../CustomPolyline/CustomPolyline";
import correctLocation from "../../assets/images/icons/correct-location.png";
import "./RoundResultMap.scss";

const RoundResultMap = () => {
  const { gameLocations, currentRound, roundResults, selectedMap } =
    useSelector((state) => state.game);
  const { username, avatar } = useSelector((state) => state.user);
  const { opponent } = useSelector((state) => state.room);

  const { userResult, opponentResult } = roundResults;
  const currentLocation = gameLocations[currentRound - 1];
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && currentLocation) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(currentLocation);
      if (userResult && userResult.guessedLocation) {
        bounds.extend(userResult.guessedLocation);
      }
      if (opponentResult && opponentResult.guessedLocation) {
        bounds.extend(opponentResult.guessedLocation);
      }
      if (!userResult?.guessedLocation && !opponentResult?.guessedLocation) {
        mapRef.current.setCenter(currentLocation);
        mapRef.current.setZoom(selectedMap.zoomLevel);
      } else {
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [currentLocation, userResult, opponentResult, selectedMap]);

  const handleMapLoad = (map) => {
    mapRef.current = map;
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(currentLocation);
    if (userResult && userResult.guessedLocation) {
      bounds.extend(userResult.guessedLocation);
    }
    if (opponentResult && opponentResult.guessedLocation) {
      bounds.extend(opponentResult.guessedLocation);
    }
    if (!userResult?.guessedLocation && !opponentResult?.guessedLocation) {
      map.setCenter(currentLocation);
      map.setZoom(selectedMap.zoomLevel);
    } else {
      map.fitBounds(bounds);
    }
  };

  const options = {
    disableDefaultUI: true,
    minZoom: 2,
  };

  return (
    <div className="round-result-map">
      <GoogleMap
        id="result-map"
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={options}
        onLoad={handleMapLoad}
      >
        <CustomMarker location={currentLocation} icon={correctLocation} />
        {userResult && userResult.guessedLocation && (
          <>
            <CustomMarker location={userResult.guessedLocation} icon={avatar} />
            <CustomPolyline
              location={userResult.guessedLocation}
              location2={currentLocation}
            />
          </>
        )}
        {opponentResult && opponentResult.guessedLocation && (
          <>
            <CustomMarker
              location={opponentResult.guessedLocation}
              icon={opponent.avatar}
            />
            <CustomPolyline
              location={opponentResult.guessedLocation}
              location2={currentLocation}
            />
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export default RoundResultMap;
