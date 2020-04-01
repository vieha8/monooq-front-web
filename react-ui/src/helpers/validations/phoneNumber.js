import { ErrorMessages } from 'variables';

const isPhoneNumberValid = phoneNumber =>
  !phoneNumber || phoneNumber.replace(/\s/g, '').length === 0;

const ValidatePhoneNumber = {
  NoHyphenVer: /^0\d{9,10}$/, // 先頭「0」+「半角数字9〜10桁」
  HyphenVer: /^0\d{2,3}-\d{2,4}-\d{4}$/, // 先頭「0」＋「半角数字2〜3桁」＋「-」＋「半角数字1〜4桁」＋「-」＋「半角数字4桁」
};

const isPhoneNumberWithoutHyphen = phoneNumber =>
  phoneNumber.match(ValidatePhoneNumber.NoHyphenVer);

const setErrorPhoneNumber = (v, errorsArray) => {
  if (isPhoneNumberValid(v)) {
    errorsArray.push(ErrorMessages.PleaseInput);
  } else if (!isPhoneNumberWithoutHyphen(v)) {
    errorsArray.push(ErrorMessages.InvalidPhoneNumber);
  }
};

export { isPhoneNumberWithoutHyphen, isPhoneNumberValid, setErrorPhoneNumber };
