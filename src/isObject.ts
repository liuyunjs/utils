import { isAnyObject } from './isAnyObject';
import { isArray } from './isArray';

export function isObject(val: any): val is Object {
  return isAnyObject(val) && !isArray(val);
}
