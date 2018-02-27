import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { FontSizes, Colors } from 'variables';

const Text = styled.h2`
  display: block;
  font-size: ${FontSizes.large}px;
  color: ${Colors.black};
  line-height: 2;
  
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    line-height: 1.6;
  `}
`;

export default props => (
  <Text>{props.children}</Text>
);
