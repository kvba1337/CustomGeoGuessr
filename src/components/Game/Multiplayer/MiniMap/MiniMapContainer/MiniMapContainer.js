import React, { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { ref, update } from "firebase/database";

import { setMarkerLocation } from "@redux/actions/gameActions";
import { database } from "@services/firebaseConfig";
import MiniMapControlButtons from "../MiniMapControlButtons/MiniMapControlButtons";
import MiniMapGuessButton from "../MiniMapGuessButton/MiniMapGuessButton";
import CustomMarker from "@components/Game/Common/CustomMarker/CustomMarker";
import "./MiniMapContainer.scss";

const libraries = ["places"];

const MiniMapContainer = () => {
  const dispatch = useDispatch();
  const { selectedMap, markerLocation } = useSelector((state) => state.game);
  const { userId, avatar } = useSelector((state) => state.user);
  const { roomId } = useSelector((state) => state.room);
  const [isGuessMade, setIsGuessMade] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapSize, setMapSize] = useState({ width: 520, height: 370 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const mapRef = useRef(null);
  const timeoutRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const MAP_SIZES = [
    { breakpoint: 100, max: 600, min: 320 },
    { breakpoint: 1130, max: 800, min: 320 },
    { breakpoint: Infinity, max: 1020, min: 320 },
  ];

  const getMapSizeLimits = (width) => {
    const { max, min } = MAP_SIZES.find((size) => width < size.breakpoint);
    return { max, min };
  };

  const { max: maxMapWidth, min: minMapWidth } = getMapSizeLimits(windowWidth);
  const isMaxSize = mapSize.width >= maxMapWidth;
  const isMinSize = mapSize.width <= minMapWidth;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mapRef.current && selectedMap) {
      mapRef.current.setCenter(selectedMap.defaultMapPosition);
      mapRef.current.setZoom(selectedMap.zoomLevel);
    }
  }, [selectedMap]);

  const handleMapClick = useCallback(
    (event) => {
      if (!isGuessMade) {
        const { latLng } = event;
        const lat = latLng.lat();
        const lng = latLng.lng();
        const location = { lat, lng };
        dispatch(setMarkerLocation(location));
      }
    },
    [isGuessMade, dispatch]
  );

  const handleGuessClick = useCallback(() => {
    if (markerLocation) {
      setIsGuessMade(true);
      update(ref(database, `rooms/${roomId}/users/${userId}`), {
        hasGuessed: true,
      });
    }
  }, [markerLocation, roomId, userId]);

  const handleMapLoad = useCallback(
    (map) => {
      mapRef.current = map;
      if (selectedMap) {
        map.setCenter(selectedMap.defaultMapPosition);
        map.setZoom(selectedMap.zoomLevel);
      }
    },
    [selectedMap]
  );

  const handleMouseEnter = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setIsExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 1000);
  }, []);

  const handleZoomIn = useCallback(() => {
    setMapSize((prevSize) => ({
      width: Math.min(prevSize.width + 200, 1020),
      height: Math.min(prevSize.height + 120, 670),
    }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setMapSize((prevSize) => ({
      width: Math.max(prevSize.width - 200, 320),
      height: Math.max(prevSize.height - 120, 250),
    }));
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div></div>;
  }

  return (
    <div
      id="guess-map-container"
      className={isExpanded ? "expanded" : ""}
      style={{
        width: isExpanded ? mapSize.width : 320,
        height: isExpanded ? mapSize.height : 250,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <MiniMapControlButtons
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        isMaxSize={isMaxSize}
        isMinSize={isMinSize}
      />
      <GoogleMap
        id="guess-map"
        onClick={handleMapClick}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          draggableCursor: isGuessMade ? "default" : "crosshair",
          clickableIcons: false,
          minZoom: 1,
        }}
        onLoad={handleMapLoad}
      >
        {markerLocation && (
          <CustomMarker location={markerLocation} icon={avatar} />
        )}
      </GoogleMap>
      <MiniMapGuessButton
        onClick={handleGuessClick}
        disabled={isGuessMade}
        hasMarker={!!markerLocation}
      />
    </div>
  );
};

export default React.memo(MiniMapContainer);
