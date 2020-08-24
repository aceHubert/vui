/**
 * object-filter
 */

export type Option = {
  key: string | number;
  value: string;
  inlineDesc: string;
  disabled: boolean;
};

export type ValueList = Array<Option['key']>;

export const getValue = function (item: Option) {
  return typeof item === 'object' ? item.value : item;
};

export const getKey = function (item: Option) {
  return typeof item === 'object' ? item.key : item;
};

export const getInlineDesc = function (item: Option) {
  return typeof item === 'object' ? item.inlineDesc : '';
};

export const isDisabled = function (item: Option) {
  return item.disabled === true;
};

export const getLabel = function (list: Option[] = [], value: Option['key']) {
  if (!list.length) {
    return value;
  }
  if (typeof list[0] === 'string') {
    return value;
  }
  const match = list.filter((one) => {
    return one.key === value;
  });
  if (match.length) {
    return match[0].value; // || match[0].label;
  }
  return value;
};

export const getLabels = function (list: Option[] = [], values: ValueList = []) {
  return values.map((value) => getLabel(list, value));
};
