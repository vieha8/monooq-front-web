// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { FontSizes, Dimens } from 'variables';
import Text from 'components/LV1/Texts/TextStatic';

const WhenIUseContentWrapper = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const WhenIUseWrap = styled.div`
  width: 263px;
  margin-bottom: ${Dimens.medium_20}px;
  ${media.phone`
    width: 100%;
    margin-bottom: ${Dimens.medium2_36}px;
  `};
`;

const Title = styled.div`
  font-size: ${FontSizes.medium1}px;
  margin-bottom: 10px;
`;

const ContentImage = styled.img`
  width: 50%;
  margin-bottom: ${Dimens.small_10}px;
`;

type PropTypes = {
  list: Array<{
    image: string,
    text: string,
  }>,
};

export default ({ list }: PropTypes) => (
  <WhenIUseContentWrapper>
    {list.map((item, i) => (
      <WhenIUseWrap key={i.toString()}>
        <ContentImage src={item.image} />
        <Title>{item.title}</Title>
        <Text fontSize={FontSizes.small}>{item.text}</Text>
      </WhenIUseWrap>
    ))}
  </WhenIUseContentWrapper>
);
