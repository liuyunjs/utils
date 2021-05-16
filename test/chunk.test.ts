import { chunk } from '../src/chunk';

test(' first argument must be a array', () => {
  // @ts-ignore
  expect(() => chunk({}, 1)).toThrow();
  // @ts-ignore
  expect(() => chunk(null, 1)).toThrow();
  // @ts-ignore
  expect(() => chunk(undefined, 1)).toThrow();
  // @ts-ignore
  expect(() => chunk('', 1)).toThrow();
  // @ts-ignore
  expect(() => chunk(1, 1)).toThrow();
  // expect(chunk([1, 2, 3, 4, 5, 6], 1)).toEqual([1, 2, 3, 4, 5, 6]);
});

test('The second parameter must be an integer and greater than 0', () => {
  // @ts-ignore
  expect(() => chunk([], '1')).toThrow();
  // @ts-ignore
  expect(() => chunk([])).toThrow();
  // @ts-ignore
  expect(() => chunk([], null)).toThrow();
  // @ts-ignore
  expect(() => chunk([], {})).toThrow();
  // @ts-ignore
  expect(() => chunk([], [])).toThrow();
  expect(() => chunk([], 0)).toThrow();
  expect(() => chunk([], 1)).not.toThrow();
});

test('chunk', () => {
  expect(chunk([1, 2, 3, 4, 5, 6, 7], 2)).toEqual([[1, 2], [3, 4], [5, 6], [7]]);
  expect(chunk([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  expect(chunk([1, 2, 3, 4, 5, 6, 7], 1)).toEqual([1, 2, 3, 4, 5, 6, 7]);
});
