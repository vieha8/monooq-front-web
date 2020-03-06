import { ErrorMessages } from 'variables';

const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

const isEmailValid = email => {
  if (!email || !email.trim().length) {
    return {
      result: false,
      reason: ErrorMessages.PleaseInput,
    };
  }

  const result = regex.test(email);

  return {
    result,
    reason: result ? '' : ErrorMessages.InvalidEmail,
  };
};

export default isEmailValid;
