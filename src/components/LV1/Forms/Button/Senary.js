import React from 'react';
import styled from 'styled-components';
import { mediaMin } from 'helpers/style/media-query';
import { Colors } from 'variables';
import { PrimaryButton } from './Primary';

const Senary = styled(PrimaryButton)`
  height: 48px;
  padding: 11px 10px;
  ${props =>
    props.height &&
    `
      height: ${props.height}px;
      padding: ${props.padding}px;
    `};
  background: ${Colors.white};
  color: ${Colors.green};
  border: 1px solid ${Colors.green};
  ${props =>
    props.disabled
      ? `
        cursor: not-allowed;
        border-color: ${Colors.lightGray1};
        color: ${Colors.lightGray1};    
      `
      : `
        &:active {
          background: ${Colors.green};
          border-color: ${Colors.white};
          color: ${Colors.white};
        }
      `};

  ${mediaMin.tablet`
    ${props =>
      !props.disabled &&
      `
        &:hover {
          background: ${Colors.green};
          border-color: ${Colors.white};
          color: ${Colors.white};
        }
      `};
  `};
`;

export default props => <Senary {...props} tabIndex={0} />;
