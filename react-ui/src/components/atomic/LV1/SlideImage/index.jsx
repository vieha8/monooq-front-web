// @flow

import React from 'react';
import ImageGallery from 'react-image-gallery';
import { convertImgixUrl } from 'helpers/imgix';

type PropTypes = {
  images: Array<{
    original: string,
    thumbnail: string,
  }>,
};

const convertImageUrl = images => {
  return images.map(({ original }) => {
    const replaceUrl = convertImgixUrl(original, 'fit=fill&fill=blur&w=540&h=300&format=auto');
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
