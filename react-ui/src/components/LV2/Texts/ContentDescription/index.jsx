// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import Text from 'components/LV1/Texts/TextStatic';

const ContentWrap = styled.div``;

const Title = styled(Text)`
  font-size: ${FontSizes.medium1}px;
  font-weight: bold;
  margin-bottom: ${Dimens.medium1}px;
  ${media.phone`
    font-size: 5vw;
    line-height: 7.5vw;
  `};
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
        <Text fontSize={FontSizes.medium2} fontSizeSp={FontSizes.medium1_22}>
          {item.header}
        </Text>
        <Text>{item.text}</Text>
      </TextWrapper>
    ))}
  </ContentWrap>
);
