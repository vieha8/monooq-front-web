// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import AvatarImage from 'components/atomic/LV1/AvatarImage';

type PropTypes = {
  to?: string,
  size?: string,
  imageSrc: string,
};

export default (props: PropTypes) => (
  <Link to={props.to}>
    <AvatarImage src={props.imageSrc} size={props.size || 32} />
  </Link>
);
