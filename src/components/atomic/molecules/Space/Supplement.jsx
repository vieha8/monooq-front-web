// @flow

import React from 'react';
import InlineText from 'components/atomic/atoms/InlineText';
import Attribute from './Attribute';

type PropTypes = {
  content: string,
}

export default (props: PropTypes) => (
  <Attribute
    title="受取りについて補足"
    content={
      <div><InlineText.Base>{props.content}</InlineText.Base></div>
    }
  />
);
