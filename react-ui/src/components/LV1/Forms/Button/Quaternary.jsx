// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import { PrimaryButton } from './Primary';

const Quaternary = styled(PrimaryButton)`
  height: 48px;
  padding: 11px 10px;
  ${props =>
    props.height &&
    `
      height: ${props.height}px;
      padding: ${props.padding}px;
    `};
  background: none;
  border: 2px solid ${Colors.brandPrimary};
  color: ${Colors.brandPrimary};

  ${props =>
    props.disabled
      ? `
    cursor: not-allowed;
    border-color: ${Colors.lightGray1};
    color: ${Colors.lightGray1};    
  `
      : `
    &:hover {
      background: none;
      border-color: ${Colors.brandTerciary};
      color: ${Colors.brandTerciary};
    }
  `};
`;

export default (props: Object) => <Quaternary {...props} tabIndex={0} />;
