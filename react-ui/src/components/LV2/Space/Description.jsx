import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import InlineText from 'components/LV1/Texts/InlineText';
import { SectionTitle } from './Section';

const Wrap = styled.div`
  margin: auto;
  padding: ${Dimens.small_10}px 0 0;
`;

const StyledText = styled(InlineText.Base)`
  display: inline-block;
  margin-top: ${Dimens.small_10}px;
`;

export default ({ title, text }) => (
  <Wrap>
    <SectionTitle text={title} />
    <StyledText>{text}</StyledText>
  </Wrap>
);
