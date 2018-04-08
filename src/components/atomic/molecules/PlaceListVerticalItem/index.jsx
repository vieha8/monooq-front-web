// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';
import Card from 'components/atomic/atoms/Card';
import InlineText from 'components/atomic/atoms/InlineText';
import HeroImage from 'components/atomic/atoms/HeroImage';

const Container = styled.div`
  width: 142px;
`;

const ImageWrapper = styled.div`
  height: 90px;
`;

const ContentWrapper = styled.div`
  padding: ${Dimens.small}px ${Dimens.medium}px;
`;

const AddressText = InlineText.Tiny.extend`
  display: block;
  color: ${Colors.brandPrimary};
  max-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentText = InlineText.Tiny.extend`
  display: block;
  max-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HomeApplianceText = InlineText.Tiny.extend`
  display: block;
  font-weight: bold;
`;

const PriceLabel = InlineText.Tiny.extend`
  display: block;
`;

const PriceText = InlineText.Tiny.extend`
  display: block;
  max-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardShadowStyle = `
  box-shadow: none;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.4);
    transition: 0.3s; 
  }
  width: 100%;
`;

type PropTypes = {
  image: {
    src: string,
    alt: string,
  },
  address: string,
  content: string,
  furniture?: boolean,
  prices: Array<number>,
  onClick: Function,
}

export default (props: PropTypes) => (
  <Container>
    <Card noPadding pointer onClick={props.onClick} customStyle={CardShadowStyle}>
      <ImageWrapper>
        <HeroImage height="90" medium {...props.image} />
      </ImageWrapper>
      <ContentWrapper>
        <AddressText>{props.address ? props.address : '-'}</AddressText>
        <ContentText>{props.content ? props.content : '-'}</ContentText>
        <HomeApplianceText>{props.furniture ? '家具・家電OK' : '-'}</HomeApplianceText>
        <PriceLabel>料金目安（30日間）</PriceLabel>
        <PriceText>
          {props.prices.join(' / ')} 円
        </PriceText>
      </ContentWrapper>
    </Card>
  </Container>
);
