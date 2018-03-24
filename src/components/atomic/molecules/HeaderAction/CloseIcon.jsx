// @flow

import React from 'react';
import styled from 'styled-components';
import { CloseIcon } from 'components/atomic/atoms/ActionIcon';

const LinkWrapper = styled.span`
  display: inline-block;
  position: relative;
`;

type PropTypes = {
  onClick?: Function,
  color?: string,
}

export default (props: PropTypes) => (
  <LinkWrapper onClick={props.onClick}>
    <CloseIcon color={props.color} fontSize={22} />
  </LinkWrapper>
);
