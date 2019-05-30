function checkNullOrEmpty(value) {
  let isOkValue = false;
  if (value && value !== undefined) {
    isOkValue = true;
  }
  return isOkValue;
}

export const formatRemoveComma = value => {
  let res = '';
  if (checkNullOrEmpty(value) && String(value)) {
    res = String(value).replace(/,/g, '');
  }
  return res;
};

export const formatAddComma = value => {
  let res = '';
  if (checkNullOrEmpty(value)) {
    const tmpValue = formatRemoveComma(value);
    if (Number(tmpValue)) {
      res = String(Number(tmpValue)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }
  }
  return res;
};

export default checkNullOrEmpty;
