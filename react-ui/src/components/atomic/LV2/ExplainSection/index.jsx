// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';

const Root = styled.div`
  margin-bottom: ${Dimens.medium3_40}px;
`;

const ExplainTitle = styled.span`
  display: block;
  font-size: ${FontSizes.medium1}px;
  line-height: ${FontSizes.medium1 * 1.5}px;
  margin-bottom: ${Dimens.small_10}px;
`;

const ExplainDescription = styled.span`
  display: block;
  font-size: ${FontSizes.medium}px;
  line-height: ${FontSizes.medium * 2}px;
  ${media.phone`
    width: 84vw;
  `};
`;

type PropTypes = {
  title: string,
  description: string,
};

export default ({ title, description }: PropTypes) => (
  <Root>
    <ExplainTitle>{title}</ExplainTitle>
    <ExplainDescription>{description}</ExplainDescription>
  </Root>
);
