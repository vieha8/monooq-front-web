// @flow

import React from 'react';
import styled from 'styled-components';
import MessageIcon from 'components/LV2/HeaderAction/MessageIcon';
import SearchIcon from 'components/LV2/HeaderAction/SearchIcon';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  text-align: ${props => props.align};
`;

type PropTypes = {
  iconLeft?: boolean,
  iconRight?: boolean,
  isPhone?: boolean,
  messageUri?: string,
  messageCount?: number,
  searchConditionUri: string,
};

export default ({
  iconLeft,
  iconRight,
  isPhone,
  messageUri,
  messageCount,
  searchConditionUri,
}: PropTypes) => (
  <Container align={(iconLeft && 'left') || (iconRight && 'right')}>
    {isPhone && <MessageIcon href={messageUri} messageCount={messageCount} />}
    <SearchIcon href={searchConditionUri} />
  </Container>
);
