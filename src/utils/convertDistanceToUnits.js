export const convertDistanceToUnits = (distanceToTarget) => {
  const distance = parseFloat(distanceToTarget).toFixed(1);
  if (distance > 10000) {
    return `${parseInt(distance / 1000)} KM`;
  }
  if (distance > 2000) {
    return `${(distance / 1000).toFixed(1)} KM`;
  }
  return `${parseInt(distance)} M`;
};
