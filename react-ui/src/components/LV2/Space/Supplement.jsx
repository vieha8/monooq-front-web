import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import { FontSizes } from 'variables';

const Wrap = styled.div`
  margin: 20px auto;
`;

const ItemWrap = styled.div`
  margin: 4px auto;
`;

export default ({ content }) => (
  <Wrap>
    <ItemWrap>
      <InlineText.Base fontSize={`${FontSizes.small_12}`}>受取りについて補足</InlineText.Base>
    </ItemWrap>
    <ItemWrap>
      <InlineText.Base fontSize={`${FontSizes.small_15}`} bold>
        {content}
      </InlineText.Base>
    </ItemWrap>
  </Wrap>
);
