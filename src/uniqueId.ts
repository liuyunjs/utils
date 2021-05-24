export const uniqueId = (prefix?: string) => {
  const str = Math.random().toString(32);
  if (!prefix) return str;
  return `${prefix}.${str}`;
};
