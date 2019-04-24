// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Collapsible from 'react-collapsible';
import { Dimens, FontSizes } from 'variables';

const CollapsibleeWrap = styled.div`
  margin-bottom: ${Dimens.medium2}px;
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

const Item = styled.p``;

const Count = styled.span`
  position: absolute;
  right: ${Dimens.medium}px;
  top: ${Dimens.small2}px;
  font-size: ${FontSizes.small_12}px;
  font-weight: normal;
`;

type PropTypes = {
  kari?: string,
};

export default (props: PropTypes) => (
  <CollapsibleeWrap>
    <CaptionWrap>地域からスペースを探す</CaptionWrap>
    <Collapsible trigger="関東">
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
    </Collapsible>
    <Collapsible trigger="近畿">
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
    </Collapsible>
    <Collapsible trigger="北海道・東北">
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
    </Collapsible>
    <Collapsible trigger="中国・四国">
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
    </Collapsible>
    <Collapsible trigger="中部">
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
    </Collapsible>
    <Collapsible trigger="九州・沖縄">
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
    </Collapsible>
  </CollapsibleeWrap>
);
