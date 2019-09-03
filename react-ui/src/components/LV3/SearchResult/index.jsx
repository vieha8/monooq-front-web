// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import Button from 'components/LV1/Forms/Button';
import SearchResultItem from 'components/LV2/Items/SearchResultItem';

const Container = styled.div`
  width: ${props => (props.isHome ? '100%' : '540px')};
  margin: 0 0 ${Dimens.medium4}px 0;
  ${media.tablet`
    width: 100%;
    text-align: left;
    margin: ${Dimens.medium1_25}px 0 ${Dimens.medium3_40}px auto;
  `};
`;

const Cell = styled.div`
  width: 50%;
  display: inline-block;
  vertical-align: top;
  padding: 0 0 ${Dimens.medium_20}px;
  ${props =>
    props.index % 2 === 1 &&
    `
    padding: 0 0 ${Dimens.medium_20}px ${Dimens.medium}px;
  `};
  ${media.tablet`
    width: 50%;
    ${props =>
      props.index % 2 === 1 &&
      `
      padding: 0 0 ${Dimens.medium_20}px ${Dimens.medium}px;
    `};
  `};
  ${media.phone`
    width: 100%;
    padding: 0 0 ${Dimens.medium1}px;
  `};
`;

const CaptionWrap = styled.div`
  width: 100%;
  word-break: keep-all;
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  margin: 0 auto ${Dimens.medium}px;
  ${media.phone`
    word-break: unset;
  `};
`;

const MoreButtonWrap = styled.div`
  width: 100%;
  max-width: 180px;
  margin: ${Dimens.small2_15}px 0px auto auto;
  font-size: ${FontSizes.small_15}px;
  font-weight: bold;
  ${media.tablet`
    max-width: 120px;
    margin: auto;
  `}
`;

const SpacesWrap = styled.div``;

type PropTypes = {
  isHome?: boolean,
  caption: string,
  spaces: Array<{
    id: number,
    image: string,
    title: string,
    addressTown: string,
    isFurniture: boolean,
    priceFull: number,
    priceHalf: number,
    priceQuarter: number,
  }>,
  history: {
    push: Function,
  },
  isMore?: boolean,
  onClickMore?: Function,
  onKeyDownButtonMore?: Function,
};

export default ({
  isHome,
  caption,
  spaces,
  isMore,
  onClickMore,
  onKeyDownButtonMore,
}: PropTypes) => (
  <Container isHome={isHome}>
    {caption && <CaptionWrap>{caption}</CaptionWrap>}
    <SpacesWrap>
      {spaces.map((space, i) => (
        <Cell key={`result_list_result_item_${i}`.toString()} index={i}>
          <SearchResultItem {...space} />
        </Cell>
      ))}
    </SpacesWrap>
    {isMore && (
      <MoreButtonWrap>
        <Button
          height={35}
          heightTab={40}
          padding="6px 10px"
          paddingTab="8.5px 10px"
          onClick={onClickMore}
          onKeyDown={onKeyDownButtonMore}
        >
          もっとみる
        </Button>
      </MoreButtonWrap>
    )}
  </Container>
);
