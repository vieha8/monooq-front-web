// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors, Dimens } from 'variables';
import Card from 'components/atomic/LV1/Card';
import InlineText from 'components/atomic/LV1/InlineText';
import HeroImage from 'components/atomic/LV1/HeroImage';

const Container = styled.div`
  width: 142px;
`;

const ImageWrapper = styled.div`
  height: 90px;
`;

const ContentWrapper = styled.div`
  padding: ${Dimens.small}px ${Dimens.medium}px;
`;

const AddressText = styled(InlineText.Tiny)`
  display: block;
  color: ${Colors.brandPrimary};
  max-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentText = styled(InlineText.Tiny)`
  display: block;
  max-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HomeApplianceText = styled(InlineText.Tiny)`
  display: block;
  font-weight: bold;
`;

const PriceLabel = styled(InlineText.Tiny)`
  display: block;
`;

const PriceText = styled(InlineText.Tiny)`
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
  href?: string,
  onClick?: Function,
};

export default (props: PropTypes) => (
  <Container>
    <Link to={props.href || ''}>
      <Card noPadding pointer onClick={props.onClick} customStyle={CardShadowStyle}>
        <ImageWrapper>
          <HeroImage height="90" medium {...props.image} />
        </ImageWrapper>
        <ContentWrapper>
          <AddressText>{props.address ? props.address : '-'}</AddressText>
          <ContentText>{props.content ? props.content : '-'}</ContentText>
          <HomeApplianceText>{props.furniture ? '家具・家電OK' : '-'}</HomeApplianceText>
          <PriceLabel>料金目安（30日間）</PriceLabel>
          <PriceText>{props.prices.join(' / ')} 円</PriceText>
        </ContentWrapper>
      </Card>
    </Link>
  </Container>
);
