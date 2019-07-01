// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/InlineText';
import { Colors, FontSizes } from 'variables';

const Wrap = styled.div`
  margin: 20px auto;
`;

const ItemWrap = styled.div`
  margin: 4px auto;
`;

type PropTypes = {
  furniture: boolean,
  content: string,
};

export default ({ furniture, content }: PropTypes) => (
  <Wrap>
    <ItemWrap>
      <InlineText.Base fontSize={`${FontSizes.small_12}`}>このスペースに置ける荷物</InlineText.Base>
    </ItemWrap>
    {furniture && (
      <ItemWrap>
        <InlineText.Base fontSize={`${FontSizes.small_15}`} bold>
          家具・家電OK
        </InlineText.Base>
      </ItemWrap>
    )}
    <ItemWrap>
      <InlineText.Base color={Colors.darkGray2} fontSize={FontSizes.small_12}>
        {content}
      </InlineText.Base>
    </ItemWrap>
  </Wrap>
);
