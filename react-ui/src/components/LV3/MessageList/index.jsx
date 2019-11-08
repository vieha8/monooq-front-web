import React from 'react';
import MessageListItem from 'components/LV2/Items/MessageListItem';

export default ({ messages }) => (
  <ul>
    {messages.map((message, i) => (
      <MessageListItem key={`inbox_item_${i}`.toString()} {...message} />
    ))}
  </ul>
);
