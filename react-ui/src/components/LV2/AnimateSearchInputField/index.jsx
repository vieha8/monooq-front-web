// @flow

import React from 'react';
import styled from 'styled-components';
import SearchIcon from 'components/atomic/LV2/HeaderAction/SearchIcon';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  text-align: ${props => props.align};
`;

const IconWrapper = styled.span`
  vertical-align: middle;
  cursor: pointer;
`;

type PropTypes = {
  iconLeft?: boolean,
  iconRight?: boolean,
  iconColor: string,
  searchConditionUri: string,
};

function Icon(props: PropTypes) {
  return (
    <IconWrapper>
      <SearchIcon color={props.iconColor} href={props.searchConditionUri} isPhone={props.isPhone} />
    </IconWrapper>
  );
}

export default (props: PropTypes) => (
  <Container align={(props.iconLeft && 'left') || (props.iconRight && 'right')}>
    {Icon(props)}
  </Container>
);
