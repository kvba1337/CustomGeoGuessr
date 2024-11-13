export const extendMapBounds = (
  map,
  gameLocations,
  userResults,
  opponentResults,
  selectedMap
) => {
  const bounds = new window.google.maps.LatLngBounds();
  gameLocations.forEach((location, index) => {
    bounds.extend(location);
    if (userResults[index]?.guessedLocation) {
      bounds.extend(userResults[index].guessedLocation);
    }
    if (opponentResults[index]?.guessedLocation) {
      bounds.extend(opponentResults[index].guessedLocation);
    }
  });
  if (
    !userResults.some((result) => result?.guessedLocation) &&
    !opponentResults.some((result) => result?.guessedLocation)
  ) {
    map.setCenter(gameLocations[0]);
    map.setZoom(selectedMap.zoomLevel);
  } else {
    map.fitBounds(bounds);
  }
};

export const getMapOptions = () => ({
  disableDefaultUI: true,
  minZoom: 2,
  clickableIcons: false,
});
