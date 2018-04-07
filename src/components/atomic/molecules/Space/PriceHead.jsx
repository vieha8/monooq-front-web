// @flow

import React from 'react';
import styled from 'styled-components';
import { H2 } from 'components/atomic/atoms/Headline';
import InlineText from 'components/atomic/atoms/InlineText';
import { Dimens } from 'variables';

const Head = styled.span`
  display: inline-block;
`;

const Text = styled.span`
  display: inline-block;
  margin-left: ${Dimens.small}px;
`;

export default () => (
  <div>
    <Head><H2>料金の目安</H2></Head>
    <Text><InlineText.Small>30日間あたり</InlineText.Small></Text>
  </div>
);
