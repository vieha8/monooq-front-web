import { ErrorMessages } from 'variables';

const isPhoneNumberValid = phoneNumber =>
  !phoneNumber || phoneNumber.replace(/\s/g, '').length === 0;

const ValidatePhoneNumber = {
  ExtraHyphenMatch: /-/,
  NoHyphenVer: /^0\d{9,10}$/, // 先頭「0」+「半角数字9〜10桁」
  HyphenVer: /^0\d{2,3}-\d{2,4}-\d{4}$/, // 先頭「0」＋「半角数字2〜3桁」＋「-」＋「半角数字1〜4桁」＋「-」＋「半角数字4桁」
};

const isPhoneNumberWithoutHyphen = phoneNumber =>
  phoneNumber.match(ValidatePhoneNumber.NoHyphenVer);

const setErrorPhoneNumber = (v, errorsArray) => {
  let noError = false;
  if (isPhoneNumberValid(v)) {
    errorsArray.push(ErrorMessages.PleaseInput);
  } else if (v.match(ValidatePhoneNumber.ExtraHyphenMatch)) {
    errorsArray.push(ErrorMessages.PleaseWithoutHyphen);
  } else if (!isPhoneNumberWithoutHyphen(v)) {
    errorsArray.push(ErrorMessages.InvalidPhoneNumber);
  } else {
    noError = true;
  }
  return noError;
};

export { isPhoneNumberWithoutHyphen, isPhoneNumberValid, setErrorPhoneNumber };
