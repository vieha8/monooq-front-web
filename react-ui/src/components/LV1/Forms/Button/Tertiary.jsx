// @flow

import React from 'react';
import styled from 'styled-components';
import { mediaMin } from 'helpers/style/media-query';
import { Colors } from 'variables';
import { PrimaryButton } from './Primary';

const Tertiary = styled(PrimaryButton)`
  background: ${Colors.darkGray2};
  border: 1px solid ${Colors.white};
  color: ${Colors.white};

  ${props =>
    props.disabled
      ? `
        cursor: not-allowed;
        border-color: ${Colors.lightGray1};
        color: ${Colors.lightGray1};    
      `
      : `
        &:active {
          background: ${Colors.lightGray1};
        }
      `};

  ${mediaMin.tablet`
      ${props =>
        !props.disabled &&
        `
          &:hover {
            background: ${Colors.lightGray1};
          }
        `};
    `};
`;

export default (props: Object) => <Tertiary {...props} tabIndex={0} />;
