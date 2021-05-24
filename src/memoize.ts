import { Once } from './once';

export function memoize<T extends (...args: any[]) => any>(
  callback: T,
  resolver?: (...args: Parameters<T>) => any,
) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }
    if (resolver !== undefined && typeof resolver !== 'function') {
      throw new TypeError('`resolver` must be a function');
    }
  }

  const cached = new Map<any, { value: ReturnType<T> }>();

  function wrapped() {
    let args = arguments,
      key = resolver ? resolver.apply(this, args) : args[0];

    let result = cached.get(key);

    if (!result) {
      result = { value: callback.apply(this, args) };
      cached.set(key, result);
    }
    return result.value;
  }

  wrapped.clear = function () {
    cached.clear();
  };

  return wrapped as Once<T>;
}
