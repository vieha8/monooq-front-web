// @flow

import React from 'react';
import styled from 'styled-components';
import { CloseIcon } from 'components/LV1/ActionIcon';

const LinkWrapper = styled.span`
  display: inline-block;
  position: relative;
`;

type PropTypes = {
  onClick?: Function,
  color?: string,
};

export default ({ onClick, color }: PropTypes) => (
  <LinkWrapper onClick={onClick}>
    <CloseIcon color={color} fontSize={24} />
  </LinkWrapper>
);
