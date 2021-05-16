import { getType } from './getType';

export function isFile(val: any): val is File {
  return getType(val) === 'File';
}
