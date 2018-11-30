// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import { FontSizes } from 'variables';

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
      <InlineText.Base fontSize={`${FontSizes.small_12}`}>受取りについて補足</InlineText.Base>
    </ItemWrap>
    <ItemWrap>
      <InlineText.Bold>{props.content}</InlineText.Bold>
    </ItemWrap>
  </Wrap>
);
