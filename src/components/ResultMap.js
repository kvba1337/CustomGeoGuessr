import React, { useCallback, memo } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import "../styles/components/ResultMap.scss";
import avatar1 from "../assets/images/avatars/avatar1.png";
import correctLocation from "../assets/images/icons/correct-location.png";

const MarkerComponent = memo(({ location, icon }) => (
  <Marker
    position={{ lat: location.lat, lng: location.lng }}
    icon={{
      url: icon,
      scaledSize: new window.google.maps.Size(30, 30),
      anchor: new window.google.maps.Point(15, 15),
    }}
  />
));

const PolylineComponent = memo(({ location, location2 }) => (
  <Polyline
    path={[location, location2]}
    options={{
      geodesic: false,
      strokeColor: "#FFFFF",
      strokeOpacity: 0,
      strokeWeight: 1,
      icons: [
        {
          icon: {
            path: "M 0 0 L 0 5 L 2 5 L 2 0 z",
            fillOpacity: 1,
            strokeOpacity: 1,
            scale: 1,
          },
          offset: "0",
          repeat: "10px",
        },
      ],
    }}
  />
));

const ResultMap = ({ currentLocation, userGuessLocation }) => {
  const onLoadMap = useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds();
      if (userGuessLocation && currentLocation) {
        bounds.extend(currentLocation);
        bounds.extend(userGuessLocation);
      } else if (currentLocation) {
        map.setCenter(currentLocation);
        map.setZoom(3);
      }
      map.fitBounds(bounds);
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
        <MarkerComponent location={currentLocation} icon={correctLocation} />
        {userGuessLocation && (
          <>
            <MarkerComponent location={userGuessLocation} icon={avatar1} />
            <PolylineComponent
              location={currentLocation}
              location2={userGuessLocation}
            />
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export default memo(ResultMap);
