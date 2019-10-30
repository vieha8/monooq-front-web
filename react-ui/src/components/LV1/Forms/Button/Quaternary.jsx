// @flow

import React from 'react';
import styled from 'styled-components';
import { mediaMin } from 'helpers/style/media-query';
import { Dimens, Colors } from 'variables';
import { PrimaryButton } from './Primary';

const Quaternary = styled(PrimaryButton)`
  height: 48px;
  padding: ${Dimens.small_10}px;
  ${props =>
    props.height &&
    `
      height: ${props.height}px;
      padding: ${props.padding}px;
    `};
  background: none;
  border: 2px solid ${props => props.color || Colors.brandPrimary};
  color: ${props => props.color || Colors.brandPrimary};

  ${props =>
    props.circle &&
    `
      border-radius: ${Dimens.medium2}px;
      box-sizing: border-box;
    `};

  ${props =>
    props.disabled
      ? `
    cursor: not-allowed;
    border-color: ${Colors.lightGray1};
    color: ${Colors.lightGray1};    
  `
      : `
    &:active {
      background: none;
      opacity: 0.8;
    }
  `};

  ${mediaMin.tablet`
    ${props =>
      !props.disabled &&
      `
        &:hover {
          background: none;
          opacity: 0.8;
        }
      `};
  `};
`;

export default (props: Object) => <Quaternary {...props} tabIndex={0} />;
