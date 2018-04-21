// @flow

import React from 'react';
import { Colors } from 'variables';
import { PrimaryButton } from './Primary';

const Tertiary = PrimaryButton.extend`
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
      &:hover {
        background: ${Colors.lightGray1};
      }
    `};
`;

export default (props: Object) => <Tertiary {...props} />;
