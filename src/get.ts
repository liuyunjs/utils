import justGet from 'just-safe-get';

export const get: (
  item: any[] | {},
  target: string | string[],
  defaultValue?: any,
) => any = justGet;
