export type Once<T> = T & {
  clear: () => void;
};

export function once<T extends (...args: any[]) => any>(callback: T) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }
  }

  let cached: { value: ReturnType<T> };

  function wrapped() {
    if (!cached) {
      cached = { value: callback.apply(this, arguments) };
    }
    return cached.value;
  }

  wrapped.clear = () => {
    cached = undefined;
  };

  return wrapped as Once<T>;
}
