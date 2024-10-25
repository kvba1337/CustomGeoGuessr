import { useCallback, useRef, useEffect, useState } from "react";

const useResultMapAutoBounds = (gameLocations, userAllGuessedLocations) => {
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

  return { mapRef, onLoadMap, renderedIndexes };
};

export default useResultMapAutoBounds;
