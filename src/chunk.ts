import { isArray } from './isArray';
import { isInteger } from './isInteger';

export function chunk(inputArr: any[], size: number) {
  if (!isArray(inputArr)) throw new TypeError('first argument must be array');
  if (!isInteger(size)) throw new TypeError('second argument must be int');
  if (size < 1) throw new TypeError('second argument must greater than or equal to 1');
  if (size < 2) return inputArr.slice();

  const result: any[][] = [];

  for (let i = 0, len = inputArr.length; i < len; i++) {
    if (i % size) {
      result[result.length - 1].push(inputArr[i]);
    } else {
      result.push([inputArr[i]]);
    }
  }

  return result;
}
