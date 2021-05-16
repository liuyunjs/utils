import { isObject } from './isObject';
import { isFunction } from './isFunction';

export function isStream(val: any): boolean {
  return isObject(val) && isFunction(val.pipe);
}

isStream.writable = function (val: any): boolean {
  return (
    isStream(val) &&
    val.writable !== false &&
    isFunction(val._write) &&
    isObject(val._writableState)
  );
};

isStream.readable = function (val: any): boolean {
  return (
    isStream(val) && val.readable !== false && isFunction(val._read) && isObject(val._readableState)
  );
};

isStream.duplex = function (val: any): boolean {
  return isStream.writable(val) && isStream.readable(val);
};

isStream.transform = function (val: any): boolean {
  return isStream.duplex(val) && isFunction(val._transform) && isObject(val._transformState);
};
