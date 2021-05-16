export const isNaN = (Number.isNaN || ((val: any): val is number => val !== val)) as (
  val: any,
) => val is number;
