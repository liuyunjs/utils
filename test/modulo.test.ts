import { modulo } from '../src';

test('modulo 取余', () => {
  expect(modulo(10, 3)).toBe(1);
  expect(modulo(-1, 3)).toBe(2);
  expect(modulo(3, 3)).toBe(0);
  expect(modulo(1, 0)).toBe(0);
});
