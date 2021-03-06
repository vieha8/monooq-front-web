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

  let replaceUrl;
  if (url.indexOf('monooq-dev.imgix.net') > -1) {
    const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/monooq-dev.appspot.com/o/';
    replaceUrl = url.replace('https://monooq-dev.imgix.net/', storageUrl);
  }
  if (url.indexOf('monooq.imgix.net') > -1) {
    const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/monooq-prod.appspot.com/o/';
    replaceUrl = url.replace('https://monooq.imgix.net/', storageUrl);
  }
  if (url.indexOf('monooq-s3.imgix.net') > -1) {
    const storageUrl = 'https://s3-ap-northeast-1.amazonaws.com/monooq/';
    replaceUrl = url.replace('https://monooq.imgix.net/', storageUrl);
  }
  if (alt && token) {
    return `${replaceUrl}?${stringify({ alt, token })}`;
  }
  return url;
};

export const convertSpaceImgUrl = (url, params) => {
  return convertImgixUrl(url, `${params}&auto=enhance&bri=8&sharp=10&sat=10`);
};
