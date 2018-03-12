// @flow

import React from 'react';
import styled from 'styled-components';
import { SearchIcon } from 'components/atoms/ActionIcon';

type PropTypes = {
  href?: string,
  onClick?: Function,
}

export default (props: PropTypes) => (
  <a href={props.href} onClick={props.onClick}>
    <SearchIcon fontSize={22} />
  </a>
);
