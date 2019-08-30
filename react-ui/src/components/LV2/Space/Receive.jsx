// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
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

export default ({ delivery, meeting }: PropTypes) => (
  <Wrap>
    <ItemWrap>
      <InlineText.Base fontSize={`${FontSizes.small_12}`}>受取り方法</InlineText.Base>
    </ItemWrap>
    {delivery && (
      <div>
        <ItemWrap>
          <InlineText.Base fontSize={`${FontSizes.small_15}`} bold>
            配送
          </InlineText.Base>
        </ItemWrap>
        <ItemWrap>
          <InlineText.Base color={Colors.darkGray2} fontSize={FontSizes.small_12}>
            ヤマト運輸など配送サービス
          </InlineText.Base>
        </ItemWrap>
      </div>
    )}
    {meeting && (
      <ItemMeetingWrap>
        <ItemWrap>
          <InlineText.Base fontSize={`${FontSizes.small_15}`} bold>
            対面
          </InlineText.Base>
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
