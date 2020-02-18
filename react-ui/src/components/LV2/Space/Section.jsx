import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';

const Title = styled.div`
  margin: 0 auto;
  padding: ${Dimens.medium2}px 0 0;
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
  ${media.phone`
    padding: ${Dimens.medium_20}px 0 0;
  `};
`;

const TitleSub = styled.div`
  margin: ${Dimens.medium_20}px auto ${Dimens.xsmall}px;
  font-weight: bold;
`;

export const SectionTitle = ({ text }) => {
  return <Title>{text}</Title>;
};

export const SectionTitleSub = ({ text }) => {
  return <TitleSub>{text}</TitleSub>;
};

export default SectionTitle;
