import { getType } from './getType';

export function isSymbol(val: any): val is symbol {
  return getType(val) === 'Symbol';
}
