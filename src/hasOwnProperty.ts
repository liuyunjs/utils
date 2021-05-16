export function hasOwnProperty(val: any, key: string | number | symbol) {
  return Object.prototype.hasOwnProperty.call(val, key);
}
