import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';

const Wrap = styled.div`
  position: relative;
  margin-left: ${Dimens.medium}px;
  font-size: ${FontSizes.small_12}px;
  line-height: ${FontSizes.small_12}px;
  font-weight: bold;
  text-align: left;
  color: ${Colors.lightGray3};
  &:before {
    content: '';
    position: absolute;
    width: ${Dimens.small2}px;
    height: ${Dimens.small2}px;
    left: -${Dimens.medium}px;
    border-radius: 50%;
    background-color: ${props => props.statusColor};
  }
`;

export default ({ setData }) => <Wrap statusColor={setData.statusColor}>{setData.viewText}</Wrap>;
