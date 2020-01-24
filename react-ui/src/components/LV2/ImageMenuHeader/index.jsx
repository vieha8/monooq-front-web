import React from 'react';
import styled from 'styled-components';
import MessageIcon from 'components/LV2/ButtonHeader/MessageIcon';

const Wrap = styled.div`
  width: 100%;
  text-align: ${props => props.align};
`;

export default ({ iconLeft, iconRight, messageUrl, messageCount }) => (
  <Wrap align={(iconLeft && 'left') || (iconRight && 'right')}>
    <MessageIcon href={messageUrl} messageCount={messageCount} />
  </Wrap>
);
