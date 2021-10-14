import { merge } from '../src';

test('throws if first argument is not an array、plain object、function', () => {
  //  @ts-ignore
  expect(() => merge('')).toThrow();
  //  @ts-ignore
  expect(() => merge(1)).toThrow();
  //  @ts-ignore
  expect(() => merge(Symbol())).toThrow();
  //  @ts-ignore
  expect(() => merge(undefined)).toThrow();
  //  @ts-ignore
  expect(() => merge(null)).toThrow();
  expect(() => merge(new Date())).toThrow();
  expect(() => merge({})).not.toThrow();
  expect(() => merge([])).not.toThrow();
  expect(() => merge(function () {})).not.toThrow();
});

test('merge plain object', () => {
  const obj1 = {};
  const obj2 = { x: 1, y: 1, z: { x: 1 } };
  const obj3 = { x: 2, z: { y: 3 } };
  const result = merge(obj1, obj2, obj3);
  expect(result).toEqual({
    x: 2,
    y: 1,
    z: {
      x: 1,
      y: 3,
    },
  });

  expect(result).toBe(obj1);
  expect(obj2).toEqual({ x: 1, y: 1, z: { x: 1 } });
  expect(obj3).toEqual({ x: 2, z: { y: 3 } });
});

test('merge array', () => {
  const arr1: any[] = [];
  const arr2 = [1, 2, [3, 4]];
  const arr3 = [2, 3, [4]];
  const result = merge(arr1, arr2, arr3);

  expect(result).toEqual([2, 3, [4, 4]]);

  expect(result).toBe(arr1);
  expect(arr2).toEqual([1, 2, [3, 4]]);
  expect(arr3).toEqual([2, 3, [4]]);
});

test('merge array to plain object or merge plain object to array', () => {
  const obj = { x: 1, y: 1, z: { x: 1 } };
  const arr = [1, 2, [3, 4]];
  expect(merge({}, obj, arr)).toEqual({
    x: 1,
    y: 1,
    z: { x: 1 },
    0: 1,
    1: 2,
    2: [3, 4],
  });
  const equalValue = arr.slice();
  //  @ts-ignore
  equalValue.x = 1;
  //  @ts-ignore
  equalValue.y = 1;
  expect(merge([], arr, obj)).not.toEqual(equalValue);
  //  @ts-ignore
  equalValue.z = { x: 1 };
  expect(merge([], arr, obj)).toEqual(equalValue);
});
