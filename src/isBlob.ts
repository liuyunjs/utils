import { getType } from './getType';

export function isBlob(val: any): val is Blob {
  return getType(val) === 'Blob';
}
