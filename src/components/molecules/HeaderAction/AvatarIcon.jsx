// @flow

import React from 'react';
import styled from 'styled-components';
import AvatarImage from 'components/atoms/AvatarImage';

type PropTypes = {
  href?: string,
  onClick?: Function,
  imageSrc: string,
  imageAlt: string,
}

export default (props: PropTypes) => (
  <a href={props.href} onClick={props.onClick}>
    <AvatarImage src={props.imageSrc} alt={props.imageAlt} size={32}/>
  </a>
);
