export const modulo = (a: number, b: number) => {
  if (b === 0) return 0;
  return ((a % b) + b) % b;
};
