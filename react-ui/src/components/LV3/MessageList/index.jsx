// @flow

import React from 'react';
import MessageListItem, {
  type PropTypes as MessageListItemPropTypes,
} from 'components/LV2/Items/MessageListItem';

type PropTypes = {
  messages: Array<MessageListItemPropTypes>,
};

export default ({ messages }: PropTypes) => (
  <ul>
    {messages.map((message, i) => (
      <MessageListItem key={`inbox_item_${i}`.toString()} {...message} />
    ))}
  </ul>
);
