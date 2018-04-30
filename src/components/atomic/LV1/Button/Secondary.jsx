// @flow

import React from 'react';
import { Colors } from 'variables';
import { PrimaryButton } from './Primary';

const Secondary = PrimaryButton.extend`
  background: ${Colors.white};
  border: 1px solid ${Colors.brandPrimary};
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
      background: ${Colors.white};
      border-color: ${Colors.brandTerciary};
      color: ${Colors.brandTerciary};
    }
  `};
`;

export default (props: Object) => <Secondary {...props} />;
