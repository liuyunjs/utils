import { isInteger } from './isInteger';

const MAX_SAFE_NUMBER = Math.pow(2, 53) - 1;

export const isSafeInteger = (Number.isSafeInteger ||
  ((val: any): val is number =>
    isInteger(val) && val <= MAX_SAFE_NUMBER && val >= -MAX_SAFE_NUMBER)) as (
  val: any,
) => val is number;
