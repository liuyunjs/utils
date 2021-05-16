import { isPrimitive } from './isPrimitive';
import { isUndefined } from './isUndefined';
import { isSymbol } from './isSymbol';
import { Once } from './once';

export function memoize<T extends (...args: any[]) => any>(
  callback: T,
  resolver: (...args: Parameters<T>) => any,
) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }
    if (resolver !== undefined && typeof resolver !== 'function') {
      throw new TypeError('`resolver` must be a function');
    }
  }

  let cachedObj: Record<string | number, { value: ReturnType<T> }> = {};
  let cachedMap = new (WeakMap || Map)<any, { value: ReturnType<T> }>();

  function wrapped() {
    let args = arguments,
      key = resolver ? resolver.apply(this, args) : args[0];
    if (isPrimitive(key)) {
      if (!isSymbol(key)) key = key + '';
      if (!(key in cachedObj)) cachedObj[key] = { value: callback.apply(this, args) };
      return cachedObj[key].value;
    }
    let result = cachedMap.get(key);

    if (isUndefined(result)) {
      result = { value: callback.apply(this, args) };
      cachedMap.set(key, result);
    }
    return result.value;
  }

  wrapped.clear = function () {
    cachedObj = {};
    cachedMap = new (WeakMap || Map)<any, { value: ReturnType<T> }>();
  };

  return wrapped as Once<T>;
}
