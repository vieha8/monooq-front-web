export const formatRemoveComma = value => {
  if (value === null) return '';
  return String(value).replace(/,/g, '');
};

export const formatAddComma = value => {
  if (value === null) return '';
  const tmpValue = formatRemoveComma(value);
  return tmpValue.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};
