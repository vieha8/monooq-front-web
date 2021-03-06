import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';
import Button from 'components/LV1/Forms/Button';
import SearchResultItem from 'components/LV2/Items/SearchResultItem';

const Wrap = styled.div`
  width: 100%;
  ${media.phone`
    margin: ${Dimens.medium1_25}px 0 0 auto;
  `};
`;

const Cell = styled.div`
  width: calc(25% - ${Dimens.small2}px);
  display: inline-block;
  vertical-align: top;
  margin: 0 ${Dimens.medium}px ${Dimens.medium2_32}px 0;
  &:nth-child(4n) {
    width: calc(25% - ${Dimens.small2}px);
    margin: 0 0 ${Dimens.medium2_32}px;
  }

  ${props =>
    props.narrow &&
    `
    width: calc(50% - ${Dimens.small}px);
    max-width: 100%;
    &:nth-child(2n) {
      width: calc(50% - ${Dimens.small}px);
      margin: 0 0 ${Dimens.medium2_32}px;
    }
  `};

  ${media.tablet1`
    ${props =>
      !props.narrow &&
      `
        width: calc(50% - ${Dimens.small}px);
        max-width: 100%;
        &:nth-child(2n) {
          width: calc(50% - ${Dimens.small}px);
          margin: 0 0 ${Dimens.medium2_32}px;
        }
      `};
  `};

  ${media.tablet`
    ${props =>
      !props.narrow &&
      `
        position: relative;
        width: 100%;
        max-width: 100%;
        margin: 0 ${Dimens.medium}px ${Dimens.medium}px 0;
        padding-bottom: ${Dimens.medium}px;
        border-bottom: 1px solid ${Colors.borderGray};
        &:nth-child(2n) {
          width: 100%;
          margin: 0 0 ${Dimens.medium2_32}px;
        }
        &:after {
          position: absolute;
          top: 50%;
          right: 5px;
          content: '';
          margin-top: -13px;
          width: 10px;
          height: 10px;
          border-top: 2px solid ${Colors.darkGray1};
          border-right: 2px solid ${Colors.darkGray1};
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
          filter: alpha(opacity=1);
          opacity: 1;
          //background-image: none !important;
        }
      `};
  `};

  ${media.phone`
    ${props =>
      props.isTag &&
      `
      width: calc(50% - 3.5px);
      margin: 0 ${Dimens.xsmall_7}px ${Dimens.medium2_35}px 0;
      &:nth-child(2n) {
        width: calc(50% - 3.5px);
        margin: 0 0 ${Dimens.medium2_35}px;
      }
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

export default ({
  isTag,
  isTop,
  caption,
  spaces,
  narrow,
  isMore,
  onClickMore,
  onKeyDownButtonMore,
  via,
}) => (
  <Wrap isTop={isTop}>
    {caption && <CaptionWrap>{caption}</CaptionWrap>}
    <SpacesWrap>
      {spaces.map((space, i) => (
        <Cell
          narrow={narrow}
          key={`result_list_result_item_${i}`.toString()}
          index={i}
          isTag={isTag}
        >
          <SearchResultItem {...space} isTag={isTag} via={via} />
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
  </Wrap>
);
