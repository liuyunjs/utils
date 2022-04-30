import justSet from 'just-safe-set';

export const set: (
  item: any[] | {},
  target: string | symbol | Array<string | symbol>,
  value: any,
) => boolean = justSet;
