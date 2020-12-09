import dayjs from 'dayjs';
import { Colors } from 'variables';

dayjs.locale('ja');

export const formatStringSlash = 'yyyy/MM/dd';
export const formatStringSlashTime = 'yyyy/MM/dd HH:mm:ss';
export const formatStringSlashTimeISO = 'YYYY-MM-DD HH:mm:ss';

export const formatDate = (date, format) => {
  const replaced = format
    .replace(/yyyy/g, date.getFullYear())
    .replace(/MM/g, `0${date.getMonth() + 1}`.slice(-2))
    .replace(/dd/g, `0${date.getDate()}`.slice(-2))
    .replace(/HH/g, `0${date.getHours()}`.slice(-2))
    .replace(/mm/g, `0${date.getMinutes()}`.slice(-2))
    .replace(/ss/g, `0${date.getSeconds()}`.slice(-2))
    .replace(/SSS/g, `00${date.getMilliseconds()}`.slice(-3));
  return replaced;
};

export const getYear = lengthYear => {
  return Array(lengthYear)
    .fill(0)
    .map((_, i) => ({
      key: i,
      value: dayjs().year() + i,
      text: `${dayjs().year() + i}年`,
    }));
};

export const getDate = (lengthPeriod, typeText) => {
  return Array(lengthPeriod)
    .fill(0)
    .map((_, i) => ({ key: i, value: i + 1, text: i + 1 + typeText }));
};

export const getToday = () => {
  return dayjs().format('YYYYMMDD');
};

export const getDateDiff = (targetDate, type) => {
  const today = dayjs().format(formatStringSlashTimeISO);
  const lastLogin = dayjs(new Date(targetDate)).format(formatStringSlashTimeISO);
  return dayjs(today).diff(lastLogin, type);
};

export const getDateRelativeLastLogin = targetDate => {
  const result = {};
  let statusColor = '';
  let viewText = '';
  const diffDay = getDateDiff(targetDate, 'days');
  if (diffDay <= 3) {
    statusColor = Colors.green;
    viewText = '3日以内';
  } else if (diffDay <= 7) {
    statusColor = Colors.brandAccent;
    viewText = '1週間以内';
  } else if (diffDay <= 30) {
    statusColor = Colors.lightGray2;
    viewText = '1ヶ月以内';
  }
  result.statusColor = statusColor;
  result.viewText = viewText;
  return result;
};

export const getDateFormated = num => {
  return `0${num}`.slice(-2);
};

export const generateDateAll = (year, month, day) => {
  return year.toString() + getDateFormated(month.toString()) + getDateFormated(day.toString());
};

export default formatDate;
