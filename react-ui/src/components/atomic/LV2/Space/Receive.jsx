// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors, FontSizes } from 'variables';

const Wrap = styled.div`
  margin: 20px auto;
`;

const ItemWrap = styled.div`
  margin: 4px auto;
`;

const ItemMeetingWrap = styled.div`
  margin-top: 10px;
`;

type PropTypes = {
  delivery: boolean,
  meeting: boolean,
};

export default (props: PropTypes) => (
  <Wrap>
    <ItemWrap>
      <InlineText.Base fontSize={`${FontSizes.small_12}`}>受取り方法</InlineText.Base>
    </ItemWrap>
    {props.delivery && (
      <div>
        <ItemWrap>
          <InlineText.Bold>配送</InlineText.Bold>
        </ItemWrap>
        <ItemWrap>
          <InlineText.Base color={Colors.darkGray2} fontSize={FontSizes.small_12}>
            Pickgo・ヤマト運輸など配送サービス
          </InlineText.Base>
        </ItemWrap>
      </div>
    )}
    {props.meeting && (
      <ItemMeetingWrap>
        <ItemWrap>
          <InlineText.Bold>対面</InlineText.Bold>
        </ItemWrap>
        <ItemWrap>
          <InlineText.Base color={Colors.darkGray2} fontSize={FontSizes.small_12}>
            直接本人から荷物を受け取ります
          </InlineText.Base>
        </ItemWrap>
      </ItemMeetingWrap>
    )}
  </Wrap>
);
