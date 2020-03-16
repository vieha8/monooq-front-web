import moment from 'moment';
import { ErrorMessages } from 'variables';
import { getToday, generateDateAll } from 'helpers/date';
import { getBreadthsDetailRoom, getBreadthsDetailOther } from 'helpers/breadths';
import { isTrimmedEmpty } from 'helpers/validations/string';

moment.locale('ja');

const Validate = {
  PackageContents: {
    Max: 1000,
  },
  Notes: {
    Max: 1000,
  },
};

export const validate = (startDate, endDate, usage, sizeType, breadth, packageContents, notes) => {
  const startDateAll = generateDateAll(startDate.year, startDate.month, startDate.day);
  const endDateAll = generateDateAll(endDate.year, endDate.month, endDate.day);

  let checkBreadth = 0;
  if (sizeType > 0 && sizeType < 4) {
    checkBreadth = getBreadthsDetailRoom(breadth) ? breadth : 0;
  } else {
    checkBreadth = getBreadthsDetailOther(breadth) ? breadth : 0;
  }

  return (
    usage &&
    breadth &&
    checkBreadth > 0 &&
    !isTrimmedEmpty(packageContents) &&
    packageContents.trim().length <= Validate.PackageContents.Max &&
    notes.trim().length <= Validate.Notes.Max &&
    moment(startDateAll).isValid() &&
    moment(endDateAll).isValid() &&
    !moment(startDateAll).isBefore(getToday()) &&
    !moment(startDateAll).isSameOrAfter(moment(endDateAll))
  );
};

export const handleChangeUI = (propName, inputValue, setItem, setErrors) => {
  const setError = [];

  switch (propName) {
    case 'usage':
      if (inputValue.length === 0) {
        setError.push(ErrorMessages.PleaseSelect);
      }
      setErrors(state => ({ ...state, usage: setError }));
      break;

    case 'breadth':
      if (inputValue.length === 0) {
        setError.push(ErrorMessages.PleaseSelect);
      }
      setErrors(state => ({ ...state, breadth: setError }));
      break;

    case 'packageContents':
      if (isTrimmedEmpty(inputValue)) {
        setError.push(ErrorMessages.PleaseInput);
      } else if (inputValue.length > Validate.PackageContents.Max) {
        setError.push(ErrorMessages.LengthMax('自己紹介', Validate.PackageContents.Max));
      }
      setErrors(state => ({ ...state, packageContents: setError }));
      break;

    case 'notes':
      if (inputValue.length > Validate.Notes.Max) {
        setError.push(ErrorMessages.LengthMax('自己紹介', Validate.Notes.Max));
      }
      setErrors(state => ({ ...state, notes: setError }));
      break;

    default:
      break;
  }

  setItem(inputValue);
};

export const handleChangeDate = (
  type,
  propName,
  inputValue,
  setItem,
  setErrors,
  startDate,
  endDate,
) => {
  const setError = [];

  let startDateYear = startDate.year;
  let startDateMonth = startDate.month;
  let startDateDay = startDate.day;
  let endDateYear = endDate.year;
  let endDateMonth = endDate.month;
  let endDateDay = endDate.day;

  if (type === 'startDate') {
    switch (propName) {
      case 'year':
        setItem(state => ({ ...state, year: inputValue }));
        startDateYear = inputValue;
        break;
      case 'month':
        setItem(state => ({ ...state, month: inputValue }));
        startDateMonth = inputValue;
        break;
      case 'day':
        setItem(state => ({ ...state, day: inputValue }));
        startDateDay = inputValue;
        break;
      default:
        break;
    }
  } else {
    switch (propName) {
      case 'year':
        setItem(state => ({ ...state, year: inputValue }));
        endDateYear = inputValue;
        break;
      case 'month':
        setItem(state => ({ ...state, month: inputValue }));
        endDateMonth = inputValue;
        break;
      case 'day':
        setItem(state => ({ ...state, day: inputValue }));
        endDateDay = inputValue;
        break;
      default:
        break;
    }
  }

  const startDateAll = generateDateAll(startDateYear, startDateMonth, startDateDay);
  const endDateAll = generateDateAll(endDateYear, endDateMonth, endDateDay);
  if (moment(startDateAll).isValid() && moment(endDateAll).isValid()) {
    if (moment(startDateAll).isBefore(getToday())) {
      setError.push(ErrorMessages.InvalidStartDate);
    }
    if (moment(startDateAll).isSameOrAfter(moment(endDateAll))) {
      setError.push(ErrorMessages.InvalidDateReverse);
    }
  } else {
    setError.push(ErrorMessages.InvalidDate);
  }

  setErrors(state => ({ ...state, desiredPeriod: setError }));
};

export default validate;
