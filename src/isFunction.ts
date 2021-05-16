export function isFunction(val: any): val is (...args: any[]) => any {
  return typeof val === 'function';
  // return toString(val) === '[object Function]';
}
