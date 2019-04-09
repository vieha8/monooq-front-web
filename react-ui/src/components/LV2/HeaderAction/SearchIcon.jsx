// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from 'components/LV1/ActionIcon';

type PropTypes = {
  href?: string,
  onClick?: Function,
  color?: string,
};

export default (props: PropTypes) => (
  <Link to={props.href} onClick={props.onClick}>
    {props.isPhone ? (
      <SearchIcon color={props.color} fontSize={20} />
    ) : (
      <SearchIcon color={props.color} fontSize={22} />
    )}
  </Link>
);
