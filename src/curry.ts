export function curry(fn: (...args: any[]) => any, arity = fn.length) {
  return function curried() {
    let args = arguments;
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    return function () {
      return curried.apply(this, Array.prototype.concat.call(args, arguments));
    };
  } as (...args: any[]) => any;
}
