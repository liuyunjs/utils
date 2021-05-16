export function isFormData(val: any): val is FormData {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
