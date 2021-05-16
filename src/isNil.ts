import { isUndefined } from './isUndefined';
import { isNull } from './isNull';

export function isNil(val: any): val is null | undefined {
  return isUndefined(val) || isNull(val);
}
