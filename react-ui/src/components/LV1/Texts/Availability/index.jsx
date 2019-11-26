import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';

const Availability = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: ${Dimens.small}px;
  font-size: ${FontSizes.small}px;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: normal;
  color: ${Colors.white};
  background-color: ${props => (props.isFull ? Colors.brandPrimary : Colors.green)};
  border-radius: 2px;
`;

export default ({ isFull }) => (
  <Availability isFull={isFull}>{isFull ? '満室' : '空室'}</Availability>
);
