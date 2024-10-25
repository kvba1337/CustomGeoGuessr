export const calculateDistanceToTarget = (
  userGuessLocation,
  correctLocation
) => {
  const userGuessLocationGoogle = new window.google.maps.LatLng(
    userGuessLocation.lat,
    userGuessLocation.lng
  );
  const correctLocationGoogle = new window.google.maps.LatLng(
    correctLocation.lat,
    correctLocation.lng
  );

  return window.google.maps.geometry.spherical.computeDistanceBetween(
    userGuessLocationGoogle,
    correctLocationGoogle
  );
};
