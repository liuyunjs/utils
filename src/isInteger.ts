import { isNumber } from './isNumber';

export const isInteger = (Number.isInteger ||
  ((val: any): val is number => isNumber(val) && Math.round(val) === val)) as (
  val: any,
) => val is number;
