// @ts-ignore
import is from 'just-is-empty';

//  是否为null undefined {} [] '' ...
export const isEmpty: (val: any) => boolean = is;
