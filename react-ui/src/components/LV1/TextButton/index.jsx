// @flow

import React from 'react';
import { media } from 'helpers/style/media-query';
import TextLink from '../TextLink';

const customStyle = `
  ${media.phone`
      font-size: 12px;
  `};
`;

export default ({ props, onClick, children }: Object) => (
  <TextLink
    {...props}
    custom={customStyle || ''}
    onClick={e => {
      e.preventDefault();
      if (onClick) {
        onClick();
      }
    }}
  >
    {children}
  </TextLink>
);
