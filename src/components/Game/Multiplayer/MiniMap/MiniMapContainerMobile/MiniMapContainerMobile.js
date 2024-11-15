import React, { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { ref, update } from "firebase/database";

import { setMarkerLocation } from "@redux/actions/gameActions";
import { database } from "@services/firebaseConfig";
import CustomMarker from "@components/Game/Common/CustomMarker/CustomMarker";
import "./MiniMapContainerMobile.scss";

const libraries = ["places"];

const MiniMapContainerMobile = ({
  isMapVisible,
  setIsMapVisible,
  isSlidingDown,
  setIsSlidingDown,
}) => {
  const dispatch = useDispatch();
  const { selectedMap, markerLocation } = useSelector((state) => state.game);
  const { userId, avatar } = useSelector((state) => state.user);
  const { roomId } = useSelector((state) => state.room);
  const [isGuessMade, setIsGuessMade] = useState(false);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

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

  const toggleMapVisibility = () => {
    setIsMapVisible((prev) => !prev);
    if (isMapVisible) {
      setIsSlidingDown(true);
      setTimeout(() => {
        setIsSlidingDown(false);
      }, 500);
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
    <>
      {!isMapVisible && (
        <button className="map-toggle-btn" onClick={toggleMapVisibility}>
          <i className="fa fa-map"></i>
        </button>
      )}
      {isMapVisible && (
        <div
          className={`mobile-map-container ${
            isSlidingDown ? "slide-down" : "slide-up"
          }`}
          onClick={toggleMapVisibility}
        >
          <div className="map-wrapper" onClick={(e) => e.stopPropagation()}>
            <GoogleMap
              id="mobile-guess-map"
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
            <button
              className={`mobile-guess-btn ${
                !markerLocation || isGuessMade ? "disabled" : ""
              }`}
              onClick={handleGuessClick}
              disabled={!markerLocation || isGuessMade}
            >
              Guess
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(MiniMapContainerMobile);
