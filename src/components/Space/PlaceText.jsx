import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';

const Text = styled.span`
  display: inline-block;
  font-size: ${FontSizes.small}px;
  color: ${Colors.brandPrimary};
`;

export default props => (
  <Text>{props.children}</Text>
);
