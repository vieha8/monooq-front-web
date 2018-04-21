// @flow

import React from 'react';
import InlineText from 'components/atomic/atoms/InlineText';
import Attribute from './Attribute';

type PropTypes = {
  content: string,
};

export default (props: PropTypes) => (
  <Attribute
    title="所在地"
    content={
      <div>
        <div>
          <InlineText.Base>{props.content}</InlineText.Base>
        </div>
        <div>
          <InlineText.Emphasis>詳しい住所はお支払い後にお知らせします。</InlineText.Emphasis>
        </div>
      </div>
    }
  />
);
