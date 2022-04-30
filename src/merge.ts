import type { O } from 'ts-toolbelt';
import { isFunction } from './isFunction';
import { isPlainObject } from './isPlainObject';
import { isArray } from './isArray';
import { hasOwnProperty } from './hasOwnProperty';

const isObj = (v: any) => isArray(v) || isPlainObject(v) || isFunction(v);

const getBase = (origin: any) => {
  if (isFunction(origin))
    return function () {
      return origin.apply(this, arguments);
    };
  return isArray(origin) ? [] : {};
};

const mergeBase = (t: any, s: any) => {
  for (let p in s) {
    if (hasOwnProperty(s, p)) {
      if (!isObj(s[p])) {
        t[p] = s[p];
      } else {
        t[p] = hasOwnProperty(t, p) ? t[p] : getBase(s[p]);
        mergeBase(t[p], s[p]);
      }
    }
  }
};

export function merge<
  T extends Record<string, any>,
  Tn extends Record<string, any>[],
>(target: T, ...otherObjects: Tn): O.Assign<T, Tn, 'deep'>;
export function merge(t: any) {
  if (!isObj(t))
    throw new TypeError('target must be a Array、 PlainObject or Function');
  for (let i = 1, len = arguments.length, s; i < len; i++) {
    s = arguments[i];
    if (isObj(s)) mergeBase(t, s);
  }
  return t;
}
