// @flow

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AvatarImage from 'components/LV1/AvatarImage';

type PropTypes = {
  to?: string,
  imageSrc: string,
  size?: string,
};

export default ({ to, imageSrc, size }: PropTypes) =>
  to ? (
    <Link to={to}>
      <AvatarImage src={imageSrc} size={size || 32} />
    </Link>
  ) : (
    <Fragment>
      <AvatarImage src={imageSrc} size={size || 32} />
    </Fragment>
  );
