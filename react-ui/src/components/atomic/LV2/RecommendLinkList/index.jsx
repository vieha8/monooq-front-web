// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import DefaultContainer from 'components/atomic/LV1/DefaultContainer';
import LinkList from 'components/atomic/LV2/LinkList';

const RecommendLinkContainer = styled(DefaultContainer)`
  margin-bottom: 240px;
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
