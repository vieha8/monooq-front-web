// @flow

import React from 'react';
import styled from 'styled-components';
import SearchResultItem from 'components/atomic/LV2/SearchResultItem';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

const Container = styled.div`
  width: 540px;
  margin: 0 auto;
  ${media.tablet`
    width: 100%;
    text-align: center;
  `};
`;

const Cell = styled.div`
  display: inline-block;
  vertical-align: top;
  ${props =>
    props.index % 3 === 1 &&
    `
    padding: 0 22.5px ${Dimens.medium1}px;
  `};
  ${media.tablet`
    padding: 0 7px ${Dimens.medium1}px;
  `};

  ${media.phone`
    width: 50%;
    padding: 0 7.5px ${Dimens.medium1}px 0;
    ${props =>
      props.index % 2 === 1 &&
      `
      padding: 0 0 ${Dimens.medium1}px 7.5px;
    `};
  `};
`;

type PropTypes = {
  spaces: Array<{
    image: string,
    title: string,
    addressTown: string,
    isFurniture: boolean,
    priceFull: number,
    priceHalf: number,
    priceQuarter: number,
    onClick: Function,
  }>,
};

export default (props: PropTypes) => (
  <Container>
    {props.spaces.map((space, i) => (
      <Cell key={`result_list_result_item_${i}`} index={i}>
        <SearchResultItem {...space} />
      </Cell>
    ))}
  </Container>
);
