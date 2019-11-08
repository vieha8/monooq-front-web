import React from 'react';
import { media } from 'helpers/style/media-query';
import TextLink from 'components/LV1/Texts/TextLink';

const customStyle = `
  ${media.phone`
      font-size: 12px;
  `};
`;

export default (props: Object) => (
  <TextLink
    {...props}
    custom={customStyle || ''}
    onClick={e => {
      e.preventDefault();
      if (props.onClick) {
        props.onClick();
      }
    }}
  >
    {props.children}
  </TextLink>
);
