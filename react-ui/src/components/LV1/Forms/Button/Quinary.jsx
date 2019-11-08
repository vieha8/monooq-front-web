import React from 'react';
import styled from 'styled-components';
import { mediaMin } from 'helpers/style/media-query';
import { Colors } from 'variables';
import { PrimaryButton } from './Primary';

const Quinary = styled(PrimaryButton)`
  height: 48px;
  padding: 11px 10px;
  ${props =>
    props.height &&
    `
      height: ${props.height}px;
      padding: ${props.padding}px;
    `};
  background: ${Colors.white};
  border: 1px solid ${Colors.lightGray2};
  color: ${Colors.black};

  ${props =>
    props.disabled
      ? `
        cursor: not-allowed;
        border-color: ${Colors.lightGray1};
        color: ${Colors.lightGray1};    
      `
      : `
        &:active {
          background: ${Colors.brandPrimary};
          border-color: ${Colors.brandPrimary};
          color: ${Colors.white};
        }
      `};

  ${mediaMin.tablet`
    ${props =>
      !props.disabled &&
      `
        &:hover {
          background: ${Colors.brandPrimary};
          border-color: ${Colors.brandPrimary};
          color: ${Colors.white};
        }
      `};
  `};
`;

export default props => <Quinary {...props} tabIndex={0} />;
