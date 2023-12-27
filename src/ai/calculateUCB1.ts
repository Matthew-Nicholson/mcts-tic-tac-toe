export function calculateUCB1(
  wins: number,
  visits: number,
  parentVisits: number
): number {
  if (visits === 0) {
    return Infinity;
  }
  const exploitation = wins / visits;
  const exploration = Math.sqrt((2 * Math.log(parentVisits)) / visits);
  return exploitation + exploration;
}
