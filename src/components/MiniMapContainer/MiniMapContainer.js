import React, { useRef, useEffect, memo } from "react";
import { GoogleMap } from "@react-google-maps/api";
import MiniMapControlButtons from "../MiniMapControlButtons/MiniMapControlButtons";
import MiniMapGuessButton from "../MiniMapGuessButton/MiniMapGuessButton";
import CustomMarker from "../CustomMarker/CustomMarker";
import "./MiniMapContainer.scss";
import avatar1 from "../../assets/images/avatars/avatar1.png";

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
        <MiniMapControlButtons
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
            <CustomMarker location={userGuessLocation} icon={avatar1} />
          )}
        </GoogleMap>
      )}
      <MiniMapGuessButton
        isGuessChosen={isGuessChosen}
        handleGuessSubmit={handleGuessSubmit}
      />
    </div>
  );
};

export default memo(MapContainer);
