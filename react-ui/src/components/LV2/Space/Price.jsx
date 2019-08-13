// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import { FontSizes, Dimens } from 'variables';

import imageFurnitureFull from 'images/furniture-full.svg';
import imageFurnitureHalf from 'images/furniture-half.svg';
import imageFurnitureQuarter from 'images/furniture-quarter.svg';

const Container = styled.div`
  padding: ${Dimens.medium2}px 0;
`;

const PriceContainer = styled.div`
  &::after {
    clear: both;
    content: '';
    display: block;
  }
`;

const TextContainer = styled.div`
  float: left;
`;

const Image = styled.img`
  display: block;
  float: right;
  width: 115px;
  height: 56px;
`;

const Text = styled.div`
  display: block;
`;

const Price = styled.div`
  display: block;
`;

const Caption = styled.div`
  display: block;
`;

type PropTypes = {
  full?: boolean,
  half?: boolean,
  quarter?: boolean,
  price: string,
};

export default ({ full, half, quarter, price }: PropTypes) => (
  <Container>
    <PriceContainer>
      <TextContainer>
        {full && (
          <Text>
            <InlineText.Base fontSize={FontSizes.medium}>スペースまるごと</InlineText.Base>
          </Text>
        )}
        {half && (
          <Text>
            <InlineText.Base fontSize={FontSizes.medium}>スペース半分</InlineText.Base>
          </Text>
        )}
        {quarter && (
          <Text>
            <InlineText.Base fontSize={FontSizes.medium}>スペース1/4</InlineText.Base>
          </Text>
        )}
        <Price>
          <InlineText.Base fontSize={FontSizes.medium}>{`${price}円`}</InlineText.Base>
        </Price>
      </TextContainer>
      {full && <Image src={imageFurnitureFull} alt="" />}
      {half && <Image src={imageFurnitureHalf} alt="" />}
      {quarter && <Image src={imageFurnitureQuarter} alt="" />}
    </PriceContainer>
    {full && (
      <Caption>
        <InlineText.EmphasisTiny fontSize={FontSizes.small}>
          スペースのほとんどを使用する荷物の場合の料金
        </InlineText.EmphasisTiny>
      </Caption>
    )}
    {half && (
      <Caption>
        <InlineText.EmphasisTiny fontSize={FontSizes.small}>
          スペースの半分程度を使用する荷物の場合の料金
        </InlineText.EmphasisTiny>
      </Caption>
    )}
    {quarter && (
      <Caption>
        <InlineText.EmphasisTiny>
          スペースの4分の1程度を使用する荷物の場合の料金
        </InlineText.EmphasisTiny>
      </Caption>
    )}
  </Container>
);
