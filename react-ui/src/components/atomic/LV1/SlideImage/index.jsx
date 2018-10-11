// @flow

import React from 'react';
import ImageGallery from 'react-image-gallery';

type PropTypes = {
  images: Array<{
    original: string,
    thumbnail: string,
  }>,
};

const convertImageUrl = images => {
  return images.map(({ original }) => {
    let storageUrl = 'https://firebasestorage.googleapis.com/v0/b/monooq-prod.appspot.com/o/';
    let imgixUrl = 'https://monooq.imgix.net/';

    if (original.indexOf('monooq-dev.appspot.com') > -1) {
      storageUrl = 'https://firebasestorage.googleapis.com/v0/b/monooq-dev.appspot.com/o/';
      imgixUrl = 'https://monooq-dev.imgix.net/';
    }

    let replaceUrl = original.replace(storageUrl, imgixUrl) + '&fit=crop&w=540&max-h=540';

    if (original.indexOf('s3-ap-northeast-1') > -1) {
      storageUrl = 'https://s3-ap-northeast-1.amazonaws.com/monooq/';
      imgixUrl = 'https://monooq-s3.imgix.net/';
      replaceUrl = original.replace(storageUrl, imgixUrl) + '?fit=crop&w=540&max-h=540';
    }

    return {
      original: replaceUrl || '',
      thumbnail: replaceUrl || '',
      bulletClass: 'space_image_gallery_bullet',
    };
  });
};

export default ({ images }: PropTypes) => (
  <ImageGallery
    items={convertImageUrl(images)}
    showThumbnails={false}
    showPlayButton={false}
    showFullscreenButton={false}
    showNav={false}
    showBullets
  />
);
