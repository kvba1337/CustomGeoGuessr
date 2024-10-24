import React, { useRef, useEffect, memo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import MapButtons from "./MapButtons";
import "../styles/components/MapContainer.scss";
import avatar1 from "../assets/images/avatars/avatar1.png";

const initializeMap = (map, defaultMapPosition, defaultZoom) => {
  map.panTo({
    lat: defaultMapPosition.lat,
    lng: defaultMapPosition.lng,
  });
  map.setZoom(defaultZoom);
};

const MapContainer = ({
  isMapExpanded,
  mapDimentions,
  handleMouseHoverMap,
  handleMouseLeaveMap,
  isLoaded,
  handleMapClick,
  userGuessLocation,
  isGuessSubmitted,
  defaultMapPosition,
  defaultZoom,
  enlargeMap,
  shrinkMap,
  isEnlargeDisabled,
  isShrinkDisabled,
  isGuessChosen,
  handleGuessSubmit,
  currentRound,
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      initializeMap(mapRef.current, defaultMapPosition, defaultZoom);
    }
  }, [currentRound, defaultMapPosition, defaultZoom]);

  return (
    <div
      id="guess-map-container"
      className={isMapExpanded ? "expanded" : ""}
      onMouseEnter={handleMouseHoverMap}
      onMouseLeave={handleMouseLeaveMap}
      style={{
        width: isMapExpanded ? `${mapDimentions.width}px` : "320px",
        height: isMapExpanded ? `${mapDimentions.height}px` : "250px",
      }}
    >
      {isMapExpanded && (
        <MapButtons
          enlargeMap={enlargeMap}
          shrinkMap={shrinkMap}
          isEnlargeDisabled={isEnlargeDisabled}
          isShrinkDisabled={isShrinkDisabled}
        />
      )}
      {isLoaded && defaultMapPosition && (
        <GoogleMap
          id="guess-map"
          onClick={handleMapClick}
          options={{
            disableDefaultUI: true,
            zoomControl: false,
            draggableCursor: isGuessSubmitted ? "default" : "crosshair",
            clickableIcons: false,
            minZoom: 1,
          }}
          onLoad={(map) => {
            mapRef.current = map;
            initializeMap(map, defaultMapPosition, defaultZoom);
          }}
        >
          {userGuessLocation && (
            <Marker
              position={userGuessLocation}
              icon={{
                url: avatar1,
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          )}
        </GoogleMap>
      )}
      <button
        className={`submit-guess-btn ${isGuessChosen ? "" : "disabled"}`}
        onClick={isGuessChosen ? handleGuessSubmit : null}
      >
        {isGuessChosen ? "GUESS" : "PLACE YOUR PIN ON THE MAP"}
      </button>
    </div>
  );
};

export default memo(MapContainer);
