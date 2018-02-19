import React from 'react';
import styled from 'styled-components';
import { isMobile } from '../../helpers/style/media-query';
import { FontSizes, Colors } from '../../variables';

const Text = styled.h2`
  display: block;
  font-size: ${FontSizes.large}px;
  color: ${Colors.black};
  line-height: 2;
  
  ${isMobile(`
    font-size: ${FontSizes.medium2}px;
    line-height: 1.6;
  `)}
`;

export default props => (
  <Text>{props.children}</Text>
);
