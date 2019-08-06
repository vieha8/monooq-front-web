// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import ContainerDefault from 'components/LV1/ContainerDefault';
import LinkList from 'components/LV2/LinkList';

const RecommendLinkContainer = styled(ContainerDefault)`
  margin-bottom: 120px;
  ${media.tablet`
    margin-bottom: 60px;
  `};
`;

const Text = styled.div`
  line-height: ${Dimens.medium1}px;
`;

export type PropTypes = {
  text?: string,
  list: Array<{
    text: string,
    path: string,
  }>,
};

export default ({ text, list }: PropTypes) => (
  <RecommendLinkContainer>
    {text && <Text>{text}</Text>}
    <LinkList list={list} />
  </RecommendLinkContainer>
);
