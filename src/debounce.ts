import d from 'debounce';

export const debounce: <A extends Function>(
  f: A,
  interval?: number,
  immediate?: boolean,
) => A & { clear(): void } & { flush(): void } = d;
