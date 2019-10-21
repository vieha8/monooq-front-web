// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import IconAreaGray from 'images/icon-area-gray.png';
import { PrimaryButton } from './Primary';

const Button = styled(PrimaryButton)`
  position: relative;
  width: fit-content;
  height: 30px;
  font-size: ${FontSizes.small}px;
  line-height: ${Dimens.medium2}px;
  padding: 0 ${Dimens.small_10}px 0 ${Dimens.medium2}px;
  border-radius: 6px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  color: ${Colors.black};
  background: ${Colors.white};
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: calc(50% - 9px);
    left: ${Dimens.small_9}px;
    width: ${Dimens.small2_14}px;
    height: ${Dimens.medium_17}px;
    background-image: url(${IconAreaGray});
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  ${props =>
    props.disabled
      ? `
    cursor: not-allowed;
    border-color: ${Colors.lightGray1};
    color: ${Colors.lightGray1};    
  `
      : `
    &:hover {
      color: ${Colors.black};
      background: ${Colors.white};
      border-color: ${Colors.white};
      opacity: 0.8;
    }
  `};
`;

export default (props: Object) => <Button {...props} tabIndex={0} />;
