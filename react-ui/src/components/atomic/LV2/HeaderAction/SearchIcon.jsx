// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from 'components/atomic/LV1/ActionIcon';

type PropTypes = {
  href?: string,
  onClick?: Function,
  color?: string,
};

export default (props: PropTypes) => (
  <Link to={props.href} onClick={props.onClick}>
    <SearchIcon color={props.color} fontSize={24} />
  </Link>
);
