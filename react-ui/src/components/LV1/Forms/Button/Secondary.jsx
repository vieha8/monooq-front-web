// @flow

import React from 'react';
import styled from 'styled-components';
import { mediaMin } from 'helpers/style/media-query';
import { Colors } from 'variables';
import { PrimaryButton } from './Primary';

const Secondary = styled(PrimaryButton)`
  height: 48px;
  padding: 11px 10px;
  ${props =>
    props.height &&
    `
      height: ${props.height}px;
      padding: ${props.padding}px;
    `};
  background: ${Colors.white};
  ${props =>
    props.borderbold
      ? `
      border: 2px solid ${Colors.brandPrimary};
  `
      : `
      border: 1px solid ${Colors.brandPrimary};
  `};
  color: ${Colors.brandPrimary};

  ${props =>
    props.disabled
      ? `
        cursor: not-allowed;
        border-color: ${Colors.lightGray1};
        color: ${Colors.lightGray1};    
      `
      : `
        &:active {
          background: ${Colors.white};
          border-color: ${Colors.brandTerciary};
          color: ${Colors.brandTerciary};
        }
      `};

  ${mediaMin.tablet`
    ${props =>
      !props.disabled &&
      `
        &:hover {
          background: ${Colors.white};
          border-color: ${Colors.brandTerciary};
          color: ${Colors.brandTerciary};
        }
      `};
  `};
`;

export default (props: Object) => <Secondary {...props} tabIndex={0} />;
