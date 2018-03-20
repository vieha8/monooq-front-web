// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import Card from 'components/atomic/atoms/Card';
import InlineText from 'components/atomic/atoms/InlineText';
import HeroImage from 'components/atomic/atoms/HeroImage';

const ImageWrapper = styled.div`
  height: 147px;
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const AddressText = InlineText.Small.extend`
  display: block;
  color: ${Colors.brandPrimary};
`;

const ContentText = InlineText.Small.extend`
  display: block;
  margin-top: 8px;
  max-height: ${1.6 * 2}em;
  overflow: hidden;
`;

const HomeApplianceText = InlineText.Small.extend`
  display: block;
  font-weight: bold;
  margin-top: 8px;
`;

const PriceLabel = InlineText.Small.extend`
  display: block;
  margin-top: 16px;
`;

const PriceText = InlineText.Small.extend`
  display: block;
  margin-top: 8px;
`;

type PropTypes = {
  image: {
    src: string,
    alt: string,
  },
  address: string,
  content: string,
  homeAppliances?: boolean,
  prices: Array<number>,
  onClick: Function,
}

export default (props: PropTypes) => (
  <Card noPadding pointer onClick={props.onClick}>
    <ImageWrapper>
      <HeroImage height="147px" medium {...props.image} />
    </ImageWrapper>
    <ContentWrapper>
      <AddressText>{props.address}</AddressText>
      <ContentText>{props.content}</ContentText>
      {props.homeAppliances && <HomeApplianceText>家具・家電OK</HomeApplianceText>}
      <PriceLabel>料金目安（30日間）</PriceLabel>
      <PriceText>
        {props.prices.join('／')}円
      </PriceText>
    </ContentWrapper>
  </Card>
);
