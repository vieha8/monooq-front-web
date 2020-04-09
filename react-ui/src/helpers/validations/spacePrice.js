import { ErrorMessages } from 'variables';
import { isNumber } from 'helpers/validations/number';

const Validate = {
  Price: {
    Max: 300000,
    Min: 3000,
    MinTokyo: 6000,
  },
};

export const isValidSpacePrice = val => {
  if (!val || val.length === 0) {
    return {
      result: false,
      reason: ErrorMessages.PleaseInput,
    };
  } else if (!isNumber(val)) {
    return {
      result: false,
      reason: ErrorMessages.PriceNumber,
    };
  } else {
    if (val < Validate.Price.Min) {
      return {
        result: false,
        reason: ErrorMessages.EstimateMin(Validate.Price.Min),
      };
    }
    if (val > Validate.Price.Max) {
      return {
        result: false,
        reason: ErrorMessages.EstimateMax(Validate.Price.Max),
      };
    }
    return {
      result: true,
      reason: null,
    };
  }
};

export const isValidSpacePriceTokyo = (val, addressPref) => {
  if (!isNumber(val)) {
    return {
      result: false,
      reason: ErrorMessages.PriceNumber,
    };
  } else {
    if (addressPref && addressPref === '東京都') {
      if (val < Validate.Price.MinTokyo) {
        return {
          result: false,
          reason: ErrorMessages.PriceMin(Validate.Price.MinTokyo),
        };
      }
    } else if (val < Validate.Price.Min) {
      return {
        reason: false,
        result: ErrorMessages.PriceMin(Validate.Price.Min),
      };
    }
    if (val > Validate.Price.Max) {
      return {
        reason: false,
        result: ErrorMessages.PriceMax(Validate.Price.Max),
      };
    }
    return {
      reason: true,
      result: null,
    };
  }
};
