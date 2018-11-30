// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import { Dimens, FontSizes } from 'variables';

const Container = styled.div``;

const Head = styled.span`
  display: inline-block;
`;

const Text = styled.span`
  display: inline-block;
  margin-left: ${Dimens.small}px;
`;

export default () => (
  <Container>
    <Head>
      <InlineText.Base fontSize={`${FontSizes.medium2}`} bold>
        料金の目安
      </InlineText.Base>
    </Head>
    <Text>
      <InlineText.Base fontSize={`${FontSizes.small_12}`} bold>
        30日間あたり
      </InlineText.Base>
    </Text>
  </Container>
);
