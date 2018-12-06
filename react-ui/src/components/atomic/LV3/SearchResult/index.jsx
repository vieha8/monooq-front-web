// @flow

import React from 'react';
import styled from 'styled-components';
import SearchResultItem from 'components/atomic/LV2/SearchResultItem';
import Button from 'components/atomic/LV1/Button';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';

const Container = styled.div`
  width: 540px;
  margin: 0 0 ${Dimens.medium2}px auto;
  ${media.tablet`
    width: 100%;
    text-align: center;
    margin: 0 auto;
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

const CaptionWrap = styled.div`
  width: 100%;
  word-break: keep-all;
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  margin: 0 auto ${Dimens.medium2}px;
  ${media.tablet`
    margin: 5px auto ${Dimens.medium1}px;
  `};
  ${media.phone`
    font-size: ${FontSizes.medium1}px;
    word-break: unset;
  `};
`;

const ButtonWrap = styled.div`
  width: 100%;
  max-width: 180px;
  margin: 5px 0 ${Dimens.large}px auto;
  ${media.tablet`
    max-width: 120px;
    margin: 5px auto ${Dimens.large}px;
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
    {props.caption && <CaptionWrap>{props.caption}</CaptionWrap>}
    {props.spaces.map((space, i) => (
      <Cell key={`result_list_result_item_${i}`} index={i}>
        <SearchResultItem {...space} />
      </Cell>
    ))}
    {props.isMoreButton && (
      <ButtonWrap>
        <Button
          primary
          height={40}
          fontSize={15}
          // TODO: ホーム画面とあわせて実装する。
          // onClick={}
        >
          もっとみる
        </Button>
      </ButtonWrap>
    )}
  </Container>
);
