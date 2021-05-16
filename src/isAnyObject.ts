import { isNull } from './isNull';

export function isAnyObject(val: any): val is Object {
  return !isNull(val) && typeof val === 'object';
}
