// 是否是基本数据类型
export const isPrimitive: (
  val: any,
) => val is
  | boolean
  | null
  | undefined
  | number
  | string
  | symbol = require('just-is-primitive');
