// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';

type PropTypes = {
  to?: string,
  imageSrc: string,
  size?: string,
};

export default ({ to, imageSrc, size }: PropTypes) =>
  to ? (
    <Link to={to}>
      <ImageAvatar src={imageSrc} size={size || 32} />
    </Link>
  ) : (
    <ImageAvatar src={imageSrc} size={size || 32} />
  );
