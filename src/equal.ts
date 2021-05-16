import { isNaN } from './isNaN';
import { isArrayLike } from './isArrayLike';
import { isArrayBufferView } from './isArrayBufferView';

const maybeEqual = (a: any, b: any, level: number) => {
  if (level) {
    return equal(a, b, level - 1);
  }
  return a === b || (isNaN(a) && isNaN(b));
};

export const equal = (a: any, b: any, level = -1) => {
  if (a === b) return true;
  const typeA = typeof a;
  if (a && b && typeA === 'object' && typeof b === typeA) {
    if (a.constructor !== b.constructor) return false;

    let length, i, keys, e;
    if (isArrayLike(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!maybeEqual(a[i], b[i], level)) return false;
      return true;
    }

    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      e = a.entries();
      while (true) {
        i = e.next();
        if (!maybeEqual(i.value[1], b.get(i.value[0]), level)) return false;
        if (i.done) return true;
      }
    }

    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      e = a.entries();
      while (true) {
        i = e.next();
        if (!b.has(i.value[0])) return false;
        if (i.done) return true;
      }
    }

    if (isArrayBufferView(a) && isArrayBufferView(b)) {
      // @ts-ignore
      length = a.length;
      // @ts-ignore
      if (length != b.length) return false;
      // @ts-ignore
      for (i = length; i-- !== 0; ) if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      e = keys[i];
      if (!maybeEqual(a[e], b[e], level)) return false;
    }

    // for (i = length; i-- !== 0; ) {
    //   const key = keys[i];

    //   if (key === '_owner' && a.$$typeof) {
    //     // React-specific: avoid traversing React elements' _owner.
    //     //  _owner contains circular references
    //     // and is not needed when comparing the actual elements (and not their owners)
    //     continue;
    //   }

    //   if (!maybeEqual(a[key], b[key], level)) return false;
    // }

    return true;
  }

  return isNaN(a) && isNaN(b);
};
