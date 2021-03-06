import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import { Dimens, FontSizes } from 'variables';

const Wrap = styled.div`
  margin-bottom: ${Dimens.small_10}px;
`;

const Head = styled.span`
  display: inline-block;
`;

const Text = styled.span`
  display: inline-block;
  margin-left: ${Dimens.small}px;
`;

export default () => (
  <Wrap>
    <Head>
      <InlineText.Base fontSize={`${FontSizes.medium_18}`} bold>
        料金の目安
      </InlineText.Base>
    </Head>
    <Text>
      <InlineText.Base fontSize={`${FontSizes.small_12}`} bold>
        30日間あたり
      </InlineText.Base>
    </Text>
  </Wrap>
);
