import React from 'react';
import styled from 'styled-components';
import MessageIcon from 'components/LV2/ButtonHeader/MessageIcon';
import Path from 'config/path';
import { useSelector } from 'react-redux';

const Wrap = styled.div`
  width: 100%;
  text-align: right;
`;

export default React.memo(() => {
  const count = useSelector(state => state.messages.unreadRooms);
  return (
    <Wrap>
      <MessageIcon href={Path.messageList()} messageCount={count} />
    </Wrap>
  );
});
