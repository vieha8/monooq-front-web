// @flow

import React from 'react';
import styled from 'styled-components';
import MessageIcon from 'components/LV2/ButtonHeader/MessageIcon';
import SearchIcon from 'components/LV2/ButtonHeader/SearchIcon';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  text-align: ${props => props.align};
`;

type PropTypes = {
  iconLeft?: boolean,
  iconRight?: boolean,
  isPhone?: boolean,
  messageUrl?: string,
  messageCount?: number,
  searchConditionUrl: string,
};

export default ({
  iconLeft,
  iconRight,
  isPhone,
  messageUrl,
  messageCount,
  searchConditionUrl,
}: PropTypes) => (
  <Container align={(iconLeft && 'left') || (iconRight && 'right')}>
    {isPhone && <MessageIcon href={messageUrl} messageCount={messageCount} />}
    <SearchIcon href={searchConditionUrl} />
  </Container>
);
