// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors, FontSizes } from 'variables';

type PropTypes = {
  content: string,
};

const Wrap = styled.div`
  margin: 20px auto;
`;

const ItemWrap = styled.div`
  margin: 4px auto;
`;

export default (props: PropTypes) => (
  <Wrap>
    <ItemWrap>
      <InlineText.Base fontSize={`${FontSizes.small_12}`}>このスペースに置ける荷物</InlineText.Base>
    </ItemWrap>
    {props.furniture && (
      <ItemWrap>
        <InlineText.Base fontSize={`${FontSizes.small_15}`} bold>
          家具・家電OK
        </InlineText.Base>
      </ItemWrap>
    )}
    <ItemWrap>
      <InlineText.Base color={Colors.darkGray2} fontSize={FontSizes.small_12}>
        {props.content}
      </InlineText.Base>
    </ItemWrap>
  </Wrap>
);
