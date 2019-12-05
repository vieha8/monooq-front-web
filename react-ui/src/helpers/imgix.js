import { parseUrl, stringify } from './query-string';

export const convertImgixUrl = (originalUrl, queryParams) => {
  let storageUrl = 'https://firebasestorage.googleapis.com/v0/b/monooq-prod.appspot.com/o/';
  let imgixUrl = 'https://monooq.imgix.net/';
  let replaceUrl = originalUrl;

  if (originalUrl.indexOf('monooq-prod.appspot.com') > -1) {
    replaceUrl = `${originalUrl.replace(storageUrl, imgixUrl)}&${queryParams}`;
  }

  if (originalUrl.indexOf('monooq-dev.appspot.com') > -1) {
    storageUrl = 'https://firebasestorage.googleapis.com/v0/b/monooq-dev.appspot.com/o/';
    imgixUrl = 'https://monooq-dev.imgix.net/';
    replaceUrl = `${originalUrl.replace(storageUrl, imgixUrl)}&${queryParams}`;
  }

  if (originalUrl.indexOf('s3-ap-northeast-1') > -1) {
    storageUrl = 'https://s3-ap-northeast-1.amazonaws.com/monooq/';
    imgixUrl = 'https://monooq-s3.imgix.net/';
    replaceUrl = `${originalUrl.replace(storageUrl, imgixUrl)}?${queryParams}`;
  }

  return replaceUrl;
};

export const convertBaseUrl = imgixUrl => {
  const {
    url,
    query: { alt, token },
  } = parseUrl(imgixUrl);
  if (alt && token) {
    return `${url}?${stringify({ alt, token })}`;
  }
  return url;
};

export const convertSpaceImgUrl = (url, params) => {
  return convertImgixUrl(url, `${params}&auto=enhance&bri=8&sharp=10&sat=10`);
};
