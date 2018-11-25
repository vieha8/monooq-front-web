// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

import Description from 'components/atomic/LV2/Space/Description';
import Image from 'components/atomic/LV2/Space/Image';
import Address from 'components/atomic/LV2/Space/Address';
import Type from 'components/atomic/LV2/Space/Type';
import AboutBaggage from 'components/atomic/LV2/Space/AboutBaggage';
import Receive from 'components/atomic/LV2/Space/Receive';
import Supplement from 'components/atomic/LV2/Space/Supplement';
import HostInfo from 'components/atomic/LV2/Space/HostInfo';

import InlineText from 'components/atomic/LV1/InlineText';
import Price from 'components/atomic/LV3/Space/Price';

const Container = styled.div`
  max-width: 540px;
  margin: auto;
  padding: 0 0 ${Dimens.medium3}px;
  ${media.phone`
    padding: 0 0 ${Dimens.huge}px;
  `};
`;

const SectionHeader = styled.div`
  margin: 0 auto;
  padding: ${Dimens.medium2}px 0 0;
  border-top: 1px solid ${Colors.borderGray};
  font-size: 18px;
  font-weight: 700;
`;

const ImageWrapper = styled.div``;

const MapWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const SpaceTitleWrapper = styled.div`
  padding: 0 ${Dimens.xsmall}px ${Dimens.medium}px;
`;

const AddressText = styled(InlineText.Base)`
  display: block;
  color: ${Colors.brandPrimary};
`;

const ContentText = styled(InlineText.Base)`
  display: block;
  margin: 5px auto;
`;

const PriceText = styled(InlineText.Base)`
  display: block;
  font-size: 18px;
  font-weight: bold;
`;

type PropTypes = {
  pref: string,
  city: string,
  town: string,
  name: string,
  images: Array<{
    original: string,
    thumbnail: string,
  }>,
  description: string,
  address: string,
  type: string,
  furniture: boolean,
  aboutBaggage: string,
  delivery: boolean,
  meeting: boolean,
  supplement: string,
  user: {
    id: string,
    name: string,
    imageUrl: string,
    profile: string,
  },
  pricefull: Number,
  pricehalf: Number,
  pricequarter: Number,
};

export default (props: PropTypes) => (
  <Container>
    <ImageWrapper>
      <Image images={props.images} />
    </ImageWrapper>
    <SpaceTitleWrapper>
      <AddressText>
        {props.pref} {props.city} {props.town}
      </AddressText>
      <ContentText>{props.name ? props.name : ''}</ContentText>
      <PriceText>
        {/* {props.prices.join('/')} */}
        5,000円〜
      </PriceText>
    </SpaceTitleWrapper>
    <HostInfo {...props.user} hostinfo />
    <Description content={props.description} />
    <SectionHeader>スペースについて</SectionHeader>
    <MapWrapper>
      <InlineText.Tiny>所在地</InlineText.Tiny>
      {props.map}
    </MapWrapper>
    <div>
      <Address content={props.address} />
      <Type content={props.type} />
    </div>
    <Price full={props.pricefull} half={props.pricehalf} quarter={props.pricequarter} />
    <SectionHeader>荷物について</SectionHeader>
    <div>
      <AboutBaggage furniture={props.furniture} content={props.aboutBaggage} />
      <Receive delivery={props.delivery} meeting={props.meeting} />
      <Supplement content={props.supplement} />
    </div>
  </Container>
);
