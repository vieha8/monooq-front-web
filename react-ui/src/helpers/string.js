export const formatRemoveComma = value => {
  if (value === null) return '';
  return String(value).replace(/,/g, '');
};

export const formatAddComma = value => {
  if (value === null) return '';

  const tmpValue = formatRemoveComma(value);
  if (!Number(tmpValue)) return '0';

  return String(Number(tmpValue)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

export const formatName = value => {
  if (value === null || !value) return '名無し';
  return value;
};

export const partialMatch = (target, format) => {
  return !target.indexOf(format);
};
