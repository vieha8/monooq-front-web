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
  let replaceUrl;

  if (imgixUrl.indexOf('monooq-dev.imgix.net') > -1) {
    const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/monooq-dev.appspot.com/o/';
    replaceUrl = imgixUrl.replace('https://monooq-dev.imgix.net/', storageUrl);
    replaceUrl = replaceUrl.replace('&fit=crop&max-w=540&max-h=290&format=auto', '');
    replaceUrl = replaceUrl.replace('&fit=crop&w=240&max-h=180&format=auto', '');
  }

  if (imgixUrl.indexOf('monooq.imgix.net') > -1) {
    const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/monooq-prod.appspot.com/o/';
    replaceUrl = imgixUrl.replace('https://monooq.imgix.net/', storageUrl);
    replaceUrl = replaceUrl.replace('&fit=crop&max-w=540&max-h=290&format=auto', '');
    replaceUrl = replaceUrl.replace('&fit=crop&w=240&max-h=180&format=auto', '');
  }

  if (imgixUrl.indexOf('monooq-s3.imgix.net') > -1) {
    const storageUrl = 'https://s3-ap-northeast-1.amazonaws.com/monooq/';
    replaceUrl = imgixUrl.replace('https://monooq-s3.imgix.net/', storageUrl);
    replaceUrl = replaceUrl.replace('?fit=crop&max-w=540&max-h=290&format=auto', '');
    replaceUrl = replaceUrl.replace('&fit=crop&w=240&max-h=180&format=auto', '');
  }

  return replaceUrl;
};
