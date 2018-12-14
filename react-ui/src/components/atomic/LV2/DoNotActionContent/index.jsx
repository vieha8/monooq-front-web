// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import Text from 'components/atomic/LV1/StaticText';

const ContentWrap = styled.div``;

const Title = styled(Text)`
  font-weight: bold;
  margin-bottom: ${Dimens.medium1}px;
`;

const TextWrapper = styled.div`
  margin-bottom: ${Dimens.medium3_40}px;
`;

export type PropTypes = {
  title: string,
  dontActionList: Array<{
    header: string,
    text: string,
  }>,
};

export default ({ title, dontActionList }: PropTypes) => (
  <ContentWrap>
    <Title>{title}</Title>
    {dontActionList.map((item, i) => (
      <TextWrapper key={i.toString()}>
        <Text>{item.header}</Text>
        <Text>{item.text}</Text>
      </TextWrapper>
    ))}
  </ContentWrap>
);
