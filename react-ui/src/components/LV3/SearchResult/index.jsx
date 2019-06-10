// @flow

import React from 'react';
import styled from 'styled-components';
import SearchResultItem from 'components/LV2/SearchResultItem';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import Button from 'components/LV1/Button';

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
  display: inline-block;
  vertical-align: top;
  ${props =>
    props.index % 3 === 1 &&
    `
    padding: 0 ${Dimens.medium1}px ${Dimens.medium_20}px;
  `};
  ${media.tablet`
    width: calc(33.333333% - 11px);
    ${props =>
      props.index % 3 === 1 &&
      `
      width: calc(33.333333% + 22px);
      padding: 0 ${Dimens.medium}px ${Dimens.medium1}px;
    `};
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
