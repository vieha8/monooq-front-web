import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';

const Text = styled.span`
  display: block;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.darkGray1};
  line-height: 2;
`;

export default props => (
  <Text>{props.children}</Text>
);
