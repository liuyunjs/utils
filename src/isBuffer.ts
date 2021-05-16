import is from 'is-buffer';

export const isBuffer = is as (val: any) => val is Buffer;
