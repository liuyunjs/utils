import { isFunction } from './isFunction';

export const isPromise = (val: any): val is Promise<any> => {
  return !!val && isFunction(val.then);
};
