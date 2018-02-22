import React from 'react';
import ImageGallery from 'react-image-gallery';

export default props => (
  <ImageGallery
    items={props.images.map(image => ({
      original: image.original || '',
      thumbnail: image.thumbnail || '',
      bulletClass: 'space_image_gallery_bullet',
    }))}
    showThumbnails={false}
    showPlayButton={false}
    showFullscreenButton={false}
    showNav={false}
    showBullets
  />
);
