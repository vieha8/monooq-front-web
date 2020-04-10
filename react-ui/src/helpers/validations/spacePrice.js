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
  let result = false;
  let reason = null;
  if (!val || val.length === 0) {
    reason = ErrorMessages.PleaseInput;
  } else if (!isNumber(val)) {
    reason = ErrorMessages.PriceNumber;
  } else if (val < Validate.Price.Min) {
    reason = ErrorMessages.EstimateMin(Validate.Price.Min);
  } else if (val > Validate.Price.Max) {
    reason = ErrorMessages.EstimateMax(Validate.Price.Max);
  } else {
    result = true;
  }
  return { result, reason };
};

export const isValidSpacePriceTokyo = (val, addressPref) => {
  let result = false;
  let reason = null;
  if (!isNumber(val)) {
    reason = ErrorMessages.PriceNumber;
  } else if (addressPref && addressPref === '東京都' && val < Validate.Price.MinTokyo) {
    reason = ErrorMessages.PriceMin(Validate.Price.MinTokyo);
  } else if (val < Validate.Price.Min) {
    reason = ErrorMessages.PriceMin(Validate.Price.Min);
  } else if (val > Validate.Price.Max) {
    reason = ErrorMessages.PriceMax(Validate.Price.Max);
  } else {
    result = true;
  }
  return { result, reason };
};
