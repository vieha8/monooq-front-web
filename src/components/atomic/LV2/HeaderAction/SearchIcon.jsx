// @flow

import React from 'react';
import { SearchIcon } from 'components/atomic/LV1/ActionIcon';

type PropTypes = {
  href?: string,
  onClick?: Function,
  color?: string,
};

export default (props: PropTypes) => (
  <a href={props.href} onClick={props.onClick}>
    <SearchIcon color={props.color} fontSize={22} />
  </a>
);
