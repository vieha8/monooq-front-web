import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import Description from 'components/LV2/Space/Description';
import Image from 'components/LV2/Space/Image';
import Address from 'components/LV2/Space/Address';
import Type from 'components/LV2/Space/Type';
import Baggage from 'components/LV2/Space/Baggage';
import Receive from 'components/LV2/Space/Receive';
import Supplement from 'components/LV2/Space/Supplement';
import InfoHost from 'components/LV2/Space/InfoHost';
import Price from 'components/LV3/Space/Price';
import ReactGA from 'react-ga';
import SearchResult from '../SearchResult';

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 0;
  ${media.tablet`
    ${props =>
      props.confirm &&
      `
      padding: ${Dimens.small2}px 0 140px;
    `};
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

const ContentText = styled(InlineText.H1)`
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
    width: 100%;
    max-width: calc(50% - 8px);
    padding: 0 0 15px;
    &:last-child {
      margin-left: ${Dimens.medium}px;
    }
  `};
`;

const RecommendSpacesWrap = styled.div`
  margin: 20px auto;
`;

export default ({
  confirm,
  images,
  pref,
  city,
  town,
  priceQuarter,
  priceFull,
  user,
  description,
  map,
  address,
  type,
  priceHalf,
  furniture,
  baggage,
  delivery,
  meeting,
  supplement,
  id,
  name,
  recommend,
}) => (
  <Container confirm={confirm}>
    <Image images={images} />
    <SpaceTitleWrapper>
      <AddressText>{`${pref} ${city} ${town}`}</AddressText>
      <ContentText>{name || ''}</ContentText>
      <PriceText>
        {priceQuarter || priceFull}
        円〜
      </PriceText>
    </SpaceTitleWrapper>
    <InfoHost {...user} infoHost />
    <Description content={description} />
    <SectionHeader>スペースについて</SectionHeader>
    <MapWrapper>
      <InlineText.Base fontSize={`${FontSizes.small_12}`} margin="2px auto 12px">
        所在地
      </InlineText.Base>
      {map}
      <Address content={address} />
      <Type content={type} />
    </MapWrapper>
    <Price full={priceFull} half={priceHalf} quarter={priceQuarter} />
    <SectionHeader>荷物について</SectionHeader>
    <Fragment>
      <Baggage furniture={furniture} content={baggage} />
      <SectionHeader>荷物の受け取り方法</SectionHeader>
      <Receive delivery={delivery} meeting={meeting} />
      <Supplement content={supplement} />
    </Fragment>
    {!confirm && (
      <Fragment>
        <ShareButtonsWrapper>
          <ButtonWrap>
            <Button
              twitter
              fill={1}
              url={`https://twitter.com/intent/tweet?url=https://monooq.com/space/${id}&text=${name}｜モノオク&hashtags=モノオク`}
              fontbold
              OnClick={() =>
                ReactGA.event({
                  category: 'Share',
                  action: 'Push Twitter Share Button At Space',
                  value: id,
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
              url={`https://www.facebook.com/sharer/sharer.php?u=https://monooq.com/space/${id}&quote=${name}｜モノオク`}
              fontbold
              OnClick={() =>
                ReactGA.event({
                  category: 'Share',
                  action: 'Push Facebook Share Button At Space',
                  value: id,
                })
              }
            >
              シェアする
            </Button>
          </ButtonWrap>
        </ShareButtonsWrapper>
        {recommend && recommend.length > 0 && (
          <Fragment>
            <SectionHeader>このスペースをみた人はこんなスペースもみています</SectionHeader>
            <RecommendSpacesWrap>
              <SearchResult spaces={recommend} narrow />
            </RecommendSpacesWrap>
          </Fragment>
        )}
      </Fragment>
    )}
  </Container>
);
