// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';

const NoCollapsibleeWrap = styled.div`
  margin-bottom: ${Dimens.medium4_50}px;
  ${media.phone`
    margin-bottom: ${Dimens.medium2_35}px;
  `};
`;

const CaptionWrap = styled.div`
  width: 100%;
  word-break: keep-all;
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  line-height: ${Dimens.medium2_36}px;
  margin: 0 auto ${Dimens.small_10}px;
  ${media.phone`
    word-break: unset;
  `};
`;

const ListWrap = styled.div``;

const Item = styled.p`
  position: relative;
  padding: ${Dimens.small_10}px ${Dimens.medium}px;
  border: 1px solid #dbdbdb;
  font-size: ${FontSizes.small_15}px;
  font-weight: bold;
  line-height: normal;
  &:first-child {
    border-radius: ${Dimens.xxsmall_4}px ${Dimens.xxsmall_4}px 0px 0px;
  }
  &:last-child {
    border-radius: 0px 0px ${Dimens.xxsmall_4}px ${Dimens.xxsmall_4}px;
  }
  &:not(:last-child) {
    border-bottom: none;
  }
`;

const Count = styled.span`
  position: absolute;
  right: ${Dimens.medium}px;
  top: ${Dimens.small2_13}px;
  font-size: ${FontSizes.small_12}px;
  font-weight: normal;
`;

type PropTypes = {
  kari?: string,
};

export default (props: PropTypes) => (
  <NoCollapsibleeWrap>
    <CaptionWrap>関東圏内から探す</CaptionWrap>
    <ListWrap>
      <Item>
        東京
        <Count>61件</Count>
      </Item>
      <Item>
        神奈川
        <Count>39件</Count>
      </Item>
      <Item>
        千葉
        <Count>28件</Count>
      </Item>
      <Item>
        埼玉
        <Count>16件</Count>
      </Item>
      <Item>
        栃木
        <Count>14件</Count>
      </Item>
      <Item>
        群馬
        <Count>12件</Count>
      </Item>
    </ListWrap>
  </NoCollapsibleeWrap>
);
