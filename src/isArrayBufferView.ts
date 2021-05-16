export function isArrayBufferView(val: any): val is ArrayBufferView {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(val);
  }
  return val?.buffer instanceof ArrayBuffer;
}
