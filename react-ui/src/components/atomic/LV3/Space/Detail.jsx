// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Button from 'components/atomic/LV1/Button';
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
import ReactGA from 'react-ga';

const Container = styled.div`
  max-width: 540px;
  margin: auto;
  padding: 0 0 ${Dimens.medium_20}px;
  ${media.phone`
    padding: 0 0 ${Dimens.large2_70}px;
  `};
`;

const SectionHeader = styled.div`
  margin: 0 auto;
  padding: ${Dimens.medium2}px 0 0;
  border-top: 1px solid ${Colors.borderGray};
  font-size: 18px;
  font-weight: 700;
  ${media.phone`
    padding: ${Dimens.medium_20}px 0 0;
  `};
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
  ${media.phone`
    text-align: right;
  `};
`;

const ShareButtonsWrapper = styled.div`
  position: relative;
`;

const ButtonWrap = styled.div`
  width: 100%;
  max-width: 184px;
  display: inline-block;
  margin: 30px auto;
  &:last-child {
    margin-left: ${Dimens.medium1}px;
  }
  ${media.phone`
    display: inline-block;
    width: 100%;
    max-width: calc(50% - 8px);
    left: 0px;
    bottom: 0px;
    z-index: 1000;
    text-align: center;
    padding: 0 0 15px;
    &:last-child {
      margin-left: ${Dimens.medium}px;
    }
  `};
`;

type PropTypes = {
  id: Number,
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
        {props.pricequarter ? props.pricequarter : props.pricefull}
        円〜
      </PriceText>
    </SpaceTitleWrapper>
    <HostInfo {...props.user} hostinfo />
    <Description content={props.description} />
    <SectionHeader>スペースについて</SectionHeader>
    <MapWrapper>
      <InlineText.Base fontSize={`${FontSizes.small_12}`} margin="2px auto 12px">
        所在地
      </InlineText.Base>
      {props.map}
      <Address content={props.address} />
      <Type content={props.type} />
    </MapWrapper>
    <Price full={props.pricefull} half={props.pricehalf} quarter={props.pricequarter} />
    <SectionHeader>荷物について</SectionHeader>
    <Fragment>
      <AboutBaggage furniture={props.furniture} content={props.aboutBaggage} />
      <Receive delivery={props.delivery} meeting={props.meeting} />
      <Supplement content={props.supplement} />
    </Fragment>
    <ShareButtonsWrapper>
      <ButtonWrap>
        <Button
          twitter
          fill={1}
          url={`https://twitter.com/intent/tweet?url=https://monooq.com/space/${props.id}&text=${
            props.name
          }｜モノオク&hashtags=モノオク`}
          fontbold
          OnClick={() =>
            ReactGA.event({
              category: 'Share',
              action: 'Push Twitter Share Button At Space',
              value: props.id,
            })
          }
        >
          ツイートする
        </Button>
      </ButtonWrap>
      <ButtonWrap>
        <Button
          facebook
          type2
          fill={1}
          url={`https://www.facebook.com/sharer/sharer.php?u=https://monooq.com/space/${
            props.id
          }&quote=${props.name}｜モノオク`}
          fontbold
          OnClick={() =>
            ReactGA.event({
              category: 'Share',
              action: 'Push Facebook Share Button At Space',
              value: props.id,
            })
          }
        >
          シェアする
        </Button>
      </ButtonWrap>
    </ShareButtonsWrapper>
  </Container>
);
