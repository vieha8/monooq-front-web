// @flow

import React from 'react';
import styled from 'styled-components';
import SearchResultItem from 'components/atomic/molecules/SearchResultItem';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

const Container = styled.div`
  max-width: 790px;
  margin: 0 auto;
  ${media.phone`
    max-width: 345px;
    margin-top: ${Dimens.medium}px;
  `};
`;

const Cell = styled.div`
  display: inline-block;
  vertical-align: top;
  ${props =>
    props.index % 3 === 1 &&
    `
    padding: 0 ${Dimens.medium}px;
  `}
  padding-bottom: ${Dimens.medium}px;

  ${media.phone`
    padding: ${Dimens.medium}px 0;
    width: 100%;
  `}
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
