import React, { useCallback, useRef, useEffect, useState, memo } from "react";
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

const ResultMapSummary = ({ userAllGuessedLocations, gameLocations }) => {
  const mapRef = useRef(null);
  const [renderedIndexes, setRenderedIndexes] = useState([]);

  const updateBounds = useCallback(() => {
    if (!mapRef.current) return;

    const bounds = new window.google.maps.LatLngBounds();
    gameLocations.forEach((location) => bounds.extend(location));
    userAllGuessedLocations.forEach(
      (location) => location && bounds.extend(location)
    );
    mapRef.current.fitBounds(bounds);
  }, [gameLocations, userAllGuessedLocations]);

  const onLoadMap = useCallback(
    (map) => {
      mapRef.current = map;
      updateBounds();
    },
    [updateBounds]
  );

  useEffect(() => {
    if (mapRef.current) {
      updateBounds();
    }
  }, [gameLocations, userAllGuessedLocations, updateBounds]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.panToBounds(mapRef.current.getBounds());
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [gameLocations, userAllGuessedLocations]);

  useEffect(() => {
    gameLocations.forEach((_, index) => {
      setTimeout(() => {
        setRenderedIndexes((prevIndexes) => [...prevIndexes, index]);
      }, index * 2);
    });
  }, [gameLocations]);

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
        {renderedIndexes.map((index) => (
          <React.Fragment
            key={`fragment-${index}-${gameLocations[index].lat}-${gameLocations[index].lng}`}
          >
            <MarkerComponent
              location={gameLocations[index]}
              icon={correctLocation}
            />
            {userAllGuessedLocations[index] && (
              <>
                <MarkerComponent
                  location={userAllGuessedLocations[index]}
                  icon={avatar1}
                />
                <PolylineComponent
                  location={gameLocations[index]}
                  location2={userAllGuessedLocations[index]}
                />
              </>
            )}
          </React.Fragment>
        ))}
      </GoogleMap>
    </div>
  );
};

export default memo(ResultMapSummary);
