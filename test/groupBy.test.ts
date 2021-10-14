import { groupBy } from '../src';

test('throws if first argument is not an array', function () {
  expect(function () {
    // @ts-ignore
    groupBy({}, function () {});
  }).toThrow();
  expect(function () {
    // @ts-ignore
    groupBy('hello', function () {});
  }).toThrow();
  expect(function () {
    // @ts-ignore
    groupBy(/hullo/, function () {});
  }).toThrow();
  expect(function () {
    // @ts-ignore
    groupBy(null, function () {});
  }).toThrow();
  expect(function () {
    // @ts-ignore
    groupBy(undefined, function () {});
  }).toThrow();
  expect(function () {
    // @ts-ignore
    groupBy();
  }).toThrow();
});

test('throws if second argument is not a function or string symbol', function () {
  expect(function () {
    // @ts-ignore
    groupBy([], {});
  }).toThrow();
  expect(function () {
    // @ts-ignore
    groupBy([], []);
  }).toThrow();
  expect(function () {
    // @ts-ignore
    groupBy([], /hullo/);
  }).toThrow();
  expect(function () {
    // @ts-ignore
    groupBy([], null);
  }).toThrow();
  expect(function () {
    // @ts-ignore
    groupBy([], undefined);
  }).toThrow();
  expect(function () {
    // @ts-ignore
    groupBy([]);
  }).toThrow();
});

test('should return grouped objects', function () {
  expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
    '4': [4.2],
    '6': [6.1, 6.3],
  });
  expect(
    groupBy([1, 2, 3, 4, 5, 6, 7, 8], function (i) {
      return i % 2;
    }),
  ).toEqual({ '0': [2, 4, 6, 8], '1': [1, 3, 5, 7] });
  expect(groupBy([{ x: 1 }, { x: 2 }], 'x')).toEqual({
    1: [{ x: 1 }],
    2: [{ x: 2 }],
  });
  expect(groupBy([{ x: 1 }, { x: 2 }], (i) => i.x)).toEqual({
    1: [{ x: 1 }],
    2: [{ x: 2 }],
  });
});
