import { once } from '../src/once';

test('function called once', () => {
  const fn = once(Math.random);
  const num = fn();

  expect(fn()).toBe(num);
  expect(fn()).toBe(num);

  fn.clear();
  expect(fn()).not.toBe(num);
});
