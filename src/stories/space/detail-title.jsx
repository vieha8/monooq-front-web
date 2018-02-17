import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors } from '../../variables';

const Text = styled.h2`
  display: block;
  font-size: ${FontSizes.large}px;
  color: ${Colors.black};
`;

export default props => (
  <Text>{props.children}</Text>
);
