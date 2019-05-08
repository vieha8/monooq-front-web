// @flow

import React, { Fragment } from 'react';
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
  iconColor: string,
  messageUri: string,
  messageCount?: number,
  searchConditionUri: string,
};

function Icon(props: PropTypes) {
  return (
    <Fragment>
      {props.isPhone && <MessageIcon href={props.messageUri} messageCount={props.messageCount} />}
      <SearchIcon color={props.iconColor} href={props.searchConditionUri} isPhone={props.isPhone} />
    </Fragment>
  );
}

export default (props: PropTypes) => (
  <Container align={(props.iconLeft && 'left') || (props.iconRight && 'right')}>
    {Icon(props)}
  </Container>
);
