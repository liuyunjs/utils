import { isNull } from './isNull';
import { isObject } from './isObject';

export function isPlainObject(val: any): val is Record<string, any> {
  if (!isObject(val)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(val);
  return isNull(prototype) || prototype === Object.prototype;
}
