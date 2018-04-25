// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import { FontSizes, Colors, Dimens } from 'variables';

import imageFurnitureFull from 'images/furniture-full.svg';
import imageFurnitureHalf from 'images/furniture-half.svg';
import imageFurnitureQuarter from 'images/furniture-quarter.svg';

const Container = styled.div`
  padding: ${Dimens.medium2}px 0;
  &:not(:first-child) {
    border-top: 1px solid ${Colors.borderGray};
  }
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
  price: string,
  full?: boolean,
  half?: boolean,
  quarter?: boolean,
};

export default (props: PropTypes) => (
  <Container>
    <PriceContainer>
      <TextContainer>
        {props.full && (
          <Text>
            <InlineText.Base fontSize={FontSizes.medium}>スペースまるごと</InlineText.Base>
          </Text>
        )}
        {props.half && (
          <Text>
            <InlineText.Base fontSize={FontSizes.medium}>スペース半分</InlineText.Base>
          </Text>
        )}
        {props.quarter && (
          <Text>
            <InlineText.Base fontSize={FontSizes.medium}>スペース1/4</InlineText.Base>
          </Text>
        )}
        <Price>
          <InlineText.Base fontSize={FontSizes.medium}>{props.price}円</InlineText.Base>
        </Price>
      </TextContainer>
      {props.full && <Image src={imageFurnitureFull} alt="" />}
      {props.half && <Image src={imageFurnitureHalf} alt="" />}
      {props.quarter && <Image src={imageFurnitureQuarter} alt="" />}
    </PriceContainer>
    {props.full && (
      <Caption>
        <InlineText.EmphasisTiny fontSize={FontSizes.small}>
          スペースのほとんどを使用する荷物の場合の料金
        </InlineText.EmphasisTiny>
      </Caption>
    )}
    {props.half && (
      <Caption>
        <InlineText.EmphasisTiny fontSize={FontSizes.small}>
          スペースの半分程度を使用する荷物の場合の料金
        </InlineText.EmphasisTiny>
      </Caption>
    )}
    {props.quarter && (
      <Caption>
        <InlineText.EmphasisTiny>
          スペースの4分の1程度を使用する荷物の場合の料金
        </InlineText.EmphasisTiny>
      </Caption>
    )}
  </Container>
);
