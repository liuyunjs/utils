import { getType } from './getType';

export const isArray = Array.isArray || ((val: any): val is any[] => getType(val) === 'Array');
