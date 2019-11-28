import React from 'react';
import ImageGallery from 'react-image-gallery';
import { convertImgixUrl } from 'helpers/imgix';

const convertImageUrl = images => {
  return images.map(({ original }) => {
    const replaceUrl = convertImgixUrl(
      original,
      'fit=crop&fill-color=DBDBDB&w=1200&h=800&auto=format',
    );
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
    showNav
    showIndex
    showBullets
    // TODO: 要調整
    slideDuration={100}
    // slideDuration={450}
  />
);
