import { ErrorMessages } from 'variables';
import { isFloat } from 'helpers/validations/number';

const Validate = {
  Tatami: {
    Max: 1000,
    Min: 0.1,
  },
};

const isValidTatami = val => {
  let result = false;
  let reason = null;
  if (!isFloat(val)) {
    reason = ErrorMessages.PriceFloat('畳数');
  } else if (val < Validate.Tatami.Min) {
    reason = ErrorMessages.TatamiMin(Validate.Tatami.Min);
  } else if (val > Validate.Tatami.Max) {
    reason = ErrorMessages.TatamiMax(Validate.Tatami.Max);
  } else {
    result = true;
  }
  return { result, reason };
};

export default isValidTatami;
