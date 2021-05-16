import { getType } from './getType';

export function isDate(val: any): val is Date {
  return getType(val) === 'Date';
}
