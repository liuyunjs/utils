import { isInteger } from './isInteger';

const MAX_SAFE_NUMBER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
const MIN_SAFE_NUMBER = Number.MIN_SAFE_INTEGER || -MAX_SAFE_NUMBER;

export const isSafeInteger = (Number.isSafeInteger ||
  ((val: any): val is number =>
    isInteger(val) && val <= MAX_SAFE_NUMBER && val >= MIN_SAFE_NUMBER)) as (
  val: any,
) => val is number;
