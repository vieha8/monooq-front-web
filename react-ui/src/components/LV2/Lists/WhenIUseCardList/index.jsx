// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { FontSizes, Colors, Dimens } from 'variables';
import Text from 'components/LV1/Texts/TextStatic';

const WhenIUseCardContentWrapper = styled.div`
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
  `};
`;

const Title = styled.div`
  font-size: ${FontSizes.medium1}px;
  margin-bottom: 12px;
`;

const ContentImage = styled.img`
  width: 100%;
  margin-bottom: ${Dimens.small_10}px;
`;

const SubTitle = styled.div`
  font-size: ${FontSizes.small_12}px;
  color: ${Colors.lightGray3};
  margin-top: 6px;
  margin-bottom: 6px;
`;

const Button = styled.div`
  font-size: ${FontSizes.small}px;
  line-height: ${FontSizes.small * 1.5}px;
  padding: 8px;
  color: ${Colors.brandPrimary};
  border: 2px solid ${Colors.brandPrimary};
  box-sizing: border-box;
  border-radius: 3px;
  margin-top: 16px;
`;

type PropTypes = {
  list: Array<{
    image: string,
    text: string,
  }>,
};

export default ({ list }: PropTypes) => (
  <WhenIUseCardContentWrapper>
    {list.map((item, i) => (
      <WhenIUseWrap key={i.toString()}>
        <ContentImage src={item.image} />
        <SubTitle>{item.subTitle}</SubTitle>
        <Title>{item.title}</Title>
        <Text fontSize={FontSizes.small_13}>{item.text}</Text>
        <Button>{item.buttonText}</Button>
      </WhenIUseWrap>
    ))}
  </WhenIUseCardContentWrapper>
);
