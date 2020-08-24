export function isString(obj: any) {
  return Object.prototype.toString.call(obj) === '[object String]';
}

export function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export default function isPlainObject(obj: any) {
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
}

export function isHtmlElement(node: any) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}

export const isFunction = (functionToCheck: any) => {
  const getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

export const isUndefined = (val: any) => {
  return typeof val === 'undefined';
};

export const isDefined = (val: any) => {
  return val !== undefined && val !== null;
};
