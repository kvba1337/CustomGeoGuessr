import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  StreetViewPanorama,
  useLoadScript,
} from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { setReturnButtonStatus } from "../../redux/actions/gameActions";
import "./StreetViewMap.scss";

const libraries = ["places"];

const StreetViewMap = () => {
  const dispatch = useDispatch();
  const { currentLocation, settings, returnButtonStatus } = useSelector(
    (state) => state.game
  );
  const [options, setOptions] = useState({});
  const streetViewRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    const baseOptions = {
      addressControl: false,
      panControl: true,
      motionTracking: false,
      motionTrackingControl: false,
      enableCloseButton: false,
      fullscreenControl: false,
      showRoadLabels: false,
    };

    let selectedOptions = {};

    switch (settings.gameMode) {
      case "Move":
        selectedOptions = {
          ...baseOptions,
          zoomControl: true,
          clickToGo: true,
          scrollwheel: true,
          linksControl: true,
        };
        break;
      case "NoMove":
        selectedOptions = {
          ...baseOptions,
          zoomControl: true,
          clickToGo: false,
          scrollwheel: false,
          linksControl: false,
        };
        break;
      case "NMPZ":
        selectedOptions = {
          ...baseOptions,
          zoomControl: false,
          clickToGo: false,
          scrollwheel: false,
          linksControl: false,
        };
        break;
      default:
        selectedOptions = baseOptions;
    }

    setOptions(selectedOptions);
  }, [settings.gameMode]);

  useEffect(() => {
    if (streetViewRef.current || returnButtonStatus === "active") {
      streetViewRef.current.setPosition(currentLocation);
      dispatch(setReturnButtonStatus("idle"));
    }
  }, [currentLocation, returnButtonStatus, dispatch]);

  const handleLoad = (streetViewPanorama) => {
    streetViewRef.current = streetViewPanorama;
    streetViewPanorama.setPosition(currentLocation);
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
    <div className="street-view-map">
      <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }}>
        <StreetViewPanorama
          onLoad={handleLoad}
          position={currentLocation}
          visible={true}
          options={options}
        />
        {settings.gameMode === "NMPZ" && (
          <div
            className="transparent-overlay"
            onClick={(event) => event.stopPropagation()}
          ></div>
        )}
      </GoogleMap>
    </div>
  );
};

export default StreetViewMap;
