// @flow

import React from 'react';
import styled from 'styled-components';
import MessageIcon from 'components/LV2/ButtonHeader/MessageIcon';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  text-align: ${props => props.align};
`;

type PropTypes = {
  iconLeft?: boolean,
  iconRight?: boolean,
  messageUrl: string,
  messageCount: number,
};

export default ({ iconLeft, iconRight, messageUrl, messageCount }: PropTypes) => (
  <Container align={(iconLeft && 'left') || (iconRight && 'right')}>
    <MessageIcon href={messageUrl} messageCount={messageCount} />
  </Container>
);
