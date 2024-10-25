export const calculateRoundScore = (distanceToTarget, mapFactor) => {
  if (distanceToTarget < 25) {
    return 5000;
  }

  const power = (-10 * (distanceToTarget / 1000)) / mapFactor;
  const score = 5000 * Math.pow(Math.E, power);

  if (score < 0) {
    return 0;
  }

  return Math.round(score);
};
