export const calculateDistance = (location1, location2) => {
  const point1 = new window.google.maps.LatLng(location1.lat, location1.lng);
  const point2 = new window.google.maps.LatLng(location2.lat, location2.lng);
  return window.google.maps.geometry.spherical.computeDistanceBetween(
    point1,
    point2
  );
};

export const calculateScore = (distanceToTarget, mapFactor) => {
  if (distanceToTarget < 50) {
    return 5000;
  }

  const power = (-10 * (distanceToTarget / 1000)) / mapFactor;
  const score = 5000 * Math.pow(Math.E, power);

  if (score < 0) {
    return 0;
  }

  return Math.round(score);
};

export const formatDistance = (distance) => {
  const formattedDistance = parseFloat(distance).toFixed(1);
  if (formattedDistance > 10000) {
    return `${parseInt(formattedDistance / 1000)} KM`;
  }
  if (formattedDistance > 2000) {
    return `${(formattedDistance / 1000).toFixed(1)} KM`;
  }
  return `${parseInt(formattedDistance)} M`;
};
