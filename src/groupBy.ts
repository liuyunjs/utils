import { isFunction } from './isFunction';
import { isString } from './isString';
import { isSymbol } from './isSymbol';

type PropertyKey = string | symbol;
type Stringifyable = {
  toString: () => string;
};

const justGroupBy = require('just-group-by');

export function groupBy<T>(
  arr: T[],
  keyOrResolver: PropertyKey | ((arg: T) => Stringifyable),
): { [key in PropertyKey]: T[] } {
  if (isFunction(keyOrResolver)) return justGroupBy(arr, keyOrResolver);
  if (!isSymbol(keyOrResolver) && !isString(keyOrResolver)) {
    throw new Error('expected a string or symbol for second argument');
  }

  //  @ts-ignore
  return justGroupBy(arr, (arg: T) => arg[keyOrResolver]);
}
