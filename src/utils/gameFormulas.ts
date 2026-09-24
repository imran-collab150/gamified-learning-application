export function nextLevelXP(level: number): number {
  return 100 * Math.pow(level, 1.5);
}

export function getProgressPercentage(xp: number, level: number): number {
  const required = nextLevelXP(level);
  return Math.min((xp / required) * 100, 100);
}
