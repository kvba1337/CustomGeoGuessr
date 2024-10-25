export const getRandomLocations = (
  selectedMapLocations,
  selectedTotalRounds
) => {
  const shuffledLocations = [...selectedMapLocations].sort(
    () => 0.5 - Math.random()
  );
  return shuffledLocations.slice(0, selectedTotalRounds);
};
