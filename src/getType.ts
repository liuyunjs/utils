import { toString } from './toString';

export function getType(payload: any): string {
  return toString(payload).slice(8, -1);
}
