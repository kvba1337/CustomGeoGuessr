import React, { useCallback, memo } from "react";
import { GoogleMap } from "@react-google-maps/api";
import "./RoundResultMap.scss";
import avatar1 from "../../assets/images/avatars/avatar1.png";
import correctLocation from "../../assets/images/icons/correct-location.png";
import CustomMarker from "../CustomMarker/CustomMarker";
import CustomPolyline from "../CustomPolyline/CustomPolyline";

const RoundResultMap = ({ currentLocation, userGuessLocation }) => {
  const onLoadMap = useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds();
      if (userGuessLocation && currentLocation) {
        bounds.extend(currentLocation);
        bounds.extend(userGuessLocation);
        map.fitBounds(bounds);
      } else if (currentLocation) {
        map.setCenter(currentLocation);
        map.setZoom(3);
      }
    },
    [userGuessLocation, currentLocation]
  );

  return (
    <div className="result-map">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        onLoad={onLoadMap}
        options={{
          disableDefaultUI: true,
          minZoom: 2,
        }}
      >
        <CustomMarker location={currentLocation} icon={correctLocation} />
        {userGuessLocation && (
          <>
            <CustomMarker location={userGuessLocation} icon={avatar1} />
            <CustomPolyline
              location={currentLocation}
              location2={userGuessLocation}
            />
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export default memo(RoundResultMap);
