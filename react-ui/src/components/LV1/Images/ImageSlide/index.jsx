import React from 'react';
import ImageGallery from 'react-image-gallery';
import { convertSpaceImgUrl } from 'helpers/imgix';

const convertImageUrl = images => {
  return images.map(({ original }) => {
    const replaceUrl = convertSpaceImgUrl(original, 'w=600&h=400&fit=crop');
    return {
      original: replaceUrl || '',
      thumbnail: replaceUrl || '',
      bulletClass: 'space_image_gallery_bullet',
    };
  });
};

export default ({ images }) => (
  <ImageGallery
    items={convertImageUrl(images)}
    showThumbnails={false}
    showPlayButton={false}
    showFullscreenButton={false}
    showNav={false}
    showBullets
  />
);
