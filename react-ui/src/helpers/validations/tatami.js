import { ErrorMessages } from 'variables';
import { isFloat } from 'helpers/validations/number';

const Validate = {
  Tatami: {
    Max: 1000,
    Min: 1,
  },
};
export const isValidTatami = val => {
  if (!isFloat(val)) {
    return {
      result: false,
      reason: ErrorMessages.PriceFloat('畳数'),
    };
  } else {
    if (val < Validate.Tatami.Min) {
      return {
        result: false,
        reason: ErrorMessages.TatamiMin(Validate.Tatami.Min),
      };
    }
    if (val > Validate.Tatami.Max) {
      return {
        result: false,
        reason: ErrorMessages.TatamiMax(Validate.Tatami.Max),
      };
    }
    return {
      result: true,
      reason: null,
    };
  }
};
