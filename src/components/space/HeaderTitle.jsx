import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { FontSizes, Colors } from 'variables';

const Text = styled.h1`
  display: block;
  font-size: ${FontSizes.xlarge}px;
  color: ${Colors.black};
  line-height: 1.6;
  
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
  `}
`;

export default props => (
  <Text>{props.children}</Text>
);
