// @flow

import React from 'react';
import { Colors } from 'variables';
import { Primary } from './Primary';

const Facebook = Primary.extend`
  background: ${Colors.facebook};
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
        background: ${Colors.facebookHover};
      }
    `};
`;

export default (props: Object) => (
  <Facebook {...props}>
    {!props.loading && (
      <span>
        <i className="fab fa-facebook-square" />
        &nbsp;
      </span>
    )}
    {props.children}
  </Facebook>
);

