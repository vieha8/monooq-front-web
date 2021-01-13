import React, { Fragment } from 'react';
import MessageListItem from 'components/LV2/Items/MessageListItem';
import { H1 } from 'components/LV1/Texts/Headline';

export default ({ messages }) => (
  <Fragment>
    <H1 bold>メッセージ一覧</H1>
    <ul>
      {messages.map((message, i) => (
        <MessageListItem key={`inbox_item_${i}`.toString()} {...message} />
      ))}
    </ul>
  </Fragment>
);
