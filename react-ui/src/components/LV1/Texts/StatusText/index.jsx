import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';

const Wrap = styled.div`
  position: relative;
  font-size: ${FontSizes.small_12}px;
  font-weight: bold;
  color: ${Colors.lightGray3};
  &:before {
    content: '';
    position: absolute;
    width: ${Dimens.small2}px;
    height: ${Dimens.small2}px;
    left: -${Dimens.medium}px;
    border-radius: 50%;
    background-color: ${props => (props.statusColor ? props.statusColor : Colors.lightGray2)};
  }
`;

export default ({ statusColor, text }) => <Wrap statusColor={statusColor}>{text}</Wrap>;
