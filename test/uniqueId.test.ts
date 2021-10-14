import { uniqueId } from '../src';

test('uniqueId test', () => {
  const str = uniqueId('test');
  expect(typeof str).toBe('string');
  expect(str.startsWith('test')).toBe(true);
});
