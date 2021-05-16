import { getType } from './getType';

export function isArrayBuffer(val: any): val is ArrayBuffer {
  return getType(val) === 'ArrayBuffer';
}
