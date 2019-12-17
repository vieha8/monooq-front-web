import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import { Dimens } from 'variables';

const Wrap = styled.div`
  margin: auto;
  padding: ${Dimens.small_10}px 0 0;
`;

export default ({ content }) => (
  <Wrap>
    <InlineText.Base>{content}</InlineText.Base>
  </Wrap>
);
