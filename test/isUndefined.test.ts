import { isUndefined } from '../src';

test('isUndefined 判断', () => {
  expect(isUndefined(undefined)).toBe(true);
  expect(isUndefined('')).toBe(false);
  expect(isUndefined('undefined')).toBe(false);
  expect(isUndefined(null)).toBe(false);
  expect(isUndefined(0)).toBe(false);
  expect(isUndefined({})).toBe(false);
  expect(isUndefined([])).toBe(false);
});
