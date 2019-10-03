// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { FontSizes, Colors, Dimens } from 'variables';
import Button from 'components/LV1/Forms/Button';
import Text from 'components/LV1/Texts/TextStatic';

const WhenIUseCardContentWrapper = styled.div`
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
  border: 1px solid ${Colors.borderGray};
  box-sizing: border-box;
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

const ContentImage = styled.img`
  width: 100%;
  margin-bottom: ${Dimens.small_10}px;
`;

const TextWrap = styled.div`
  padding: 0 ${Dimens.medium_20}px ${Dimens.medium_20}px;
`;

const SubTitle = styled.div`
  font-size: ${FontSizes.small_12}px;
  font-weight: 500;
  color: ${Colors.lightGray3};
  margin: ${Dimens.xsmall}px auto ${Dimens.small}px;
`;

const Title = styled.div`
  font-size: ${FontSizes.medium1}px;
  font-weight: bold;
  margin-bottom: ${Dimens.small2}px;
  ${media.desktop`
    font-size: ${FontSizes.medium_17}px;
  `};
`;

const TextStyled = styled(Text)`
  height: auto;
  ${media.desktop`
    height: ${Dimens.large4_80}px;
  `};
  ${media.tablet`
    height: auto;
  `};
`;

const ButtonWrap = styled.div`
  margin-top: ${Dimens.medium}px;
`;

type PropTypes = {
  list: Array<{
    image: string,
    text: string | component,
  }>,
};

export default ({ list }: PropTypes) => (
  <WhenIUseCardContentWrapper>
    {list.map((item, i) => (
      <WhenIUseWrap key={i.toString()}>
        <ContentImage src={item.image} />
        <TextWrap>
          <SubTitle>{item.subTitle}</SubTitle>
          <Title>{item.title}</Title>
          <TextStyled fontSize={FontSizes.small_13}>{item.text}</TextStyled>
          <ButtonWrap>
            <Button
              quaternary
              center
              link
              href={item.buttonLink}
              height={40}
              fontSize={14}
              lineheight={15}
            >
              {item.buttonText}
            </Button>
          </ButtonWrap>
        </TextWrap>
      </WhenIUseWrap>
    ))}
  </WhenIUseCardContentWrapper>
);
