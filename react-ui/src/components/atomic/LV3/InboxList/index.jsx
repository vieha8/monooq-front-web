// @flow

import React from 'react';
import InboxItem, { type PropTypes as InboxItemPropTypes } from 'components/atomic/LV2/InboxItem';

type PropTypes = {
  messages: Array<InboxItemPropTypes>,
};

export default (messages: PropTypes) => (
  <ul>
    {messages.map((message, i) => (
      <InboxItem key={`inbox_item_${i}`.toString()} {...message} />
    ))}
  </ul>
);
