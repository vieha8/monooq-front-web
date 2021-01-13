import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { FontSizes, Dimens } from 'variables';
import Text from 'components/LV1/Texts/TextStatic';

const WhenIUseContentWrapper = styled.div`
  width: 100%;
  max-width: 1013px;
  margin: auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  ${media.tablet`
    display: block;
    flex-wrap: wrap;
  `};
`;

const WhenIUseWrap = styled.div`
  width: 100%;
  max-width: calc(400px - 4px);
  margin-bottom: ${Dimens.medium_20}px;
  &:nth-child(2n) {
    margin: 0 ${Dimens.small2}px;
  }
  ${media.tablet`
    max-width: 420px;
    margin: 0 auto ${Dimens.medium}px;
    &:nth-child(2n) {
      margin: 0 auto ${Dimens.medium}px;
    }
  `};
`;

const Title = styled.div`
  font-size: ${FontSizes.medium1}px;
  font-weight: bold;
  margin-bottom: 10px;
  ${media.desktop`
    font-size: ${FontSizes.medium_17}px;
  `};
`;

const ContentImage = styled.img`
  width: 50%;
`;

export default ({ list }) => (
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
