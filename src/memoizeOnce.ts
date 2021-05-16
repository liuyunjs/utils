import { equal } from './equal';
import { Once } from './once';

export function memoizeOnce<T extends (...args: any[]) => any>(callback: T) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }
  }

  let cached: { value: ReturnType<T>; args: IArguments };

  function wrapped() {
    if (!cached || !equal(cached.args, arguments, 0)) {
      cached = {
        value: callback.apply(this, arguments),
        args: arguments,
      };
    }

    return cached.value;
  }

  wrapped.clear = function () {
    cached = undefined;
  };

  return wrapped as Once<T>;
}
