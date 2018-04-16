// @flow

import React from 'react';
import AvatarImage from 'components/atomic/atoms/AvatarImage';

type PropTypes = {
  href?: string,
  onClick?: Function,
  imageSrc: string,
};

export default (props: PropTypes) => (
  <a href={props.href} onClick={props.onClick}>
    <AvatarImage src={props.imageSrc} size={32} />
  </a>
);
