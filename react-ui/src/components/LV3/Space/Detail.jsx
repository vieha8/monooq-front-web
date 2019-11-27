import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';
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
import ImageCheckRed from 'images/check-circle-red.svg';
import ImageSnsTwitter from 'images/sns-twitter-circle.svg';
import ImageSnsFacebook from 'images/sns-facebook-circle.svg';
import SearchResult from '../SearchResult';

const Container = styled.div`
  ${'' /* max-width: 600px; */}
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

const SpaceDetailWrap = styled.div`
  display: flex;
  max-width: 1000px;
  margin: auto;
`;

const LeftWrap = styled.div`
  width: 100%;
  max-width: 660px;
  background-color: green;
`;

const RightWrap = styled.div`
  width: 100%;
  max-width: 340px;
  font-size: ${FontSizes.small_12}px;
  text-align: center;
  ${media.tablet`
    display: none;
  `};
`;

const RequestCard = styled.div`
  background: ${Colors.white};
  box-shadow: 0px 0px ${Dimens.medium}px rgba(0, 0, 0, 0.05);
  border-radius: ${Dimens.xxsmall}px;
  padding: ${Dimens.medium2_32}px ${Dimens.medium_18}px;
  color: ${Colors.lightGray3};
  line-height: normal;
`;

const RequestTitle = styled.div`
  font-weight: bold;
  font-size: ${FontSizes.medium1}px;
  line-height: normal;
  color: ${Colors.black};
  margin-bottom: ${Dimens.medium_20}px;
`;

const RequestCheckWrap = styled.div`
  padding: ${Dimens.medium_20}px;
  font-size: ${FontSizes.small}px;
  line-height: normal;
  color: ${Colors.black};
  background-color: ${Colors.lightGray1Bg};
`;

const RequestCheckTitle = styled.div`
  font-weight: bold;
  margin-bottom: ${Dimens.medium_20}px;
`;

const RequestCheckUl = styled.ul`
  text-align: left;
`;

const RequestCheckLi = styled.li`
  position: relative;
  padding-left: ${Dimens.medium2}px;
  ${props =>
    props.margin &&
    `
    margin: ${Dimens.small_10}px auto;
  `};
  &::before {
    position: absolute;
    content: '';
    top: calc(50% - ${Dimens.small_10}px);
    left: 0px;
    width: ${Dimens.medium_20}px;
    height: ${Dimens.medium_20}px;
    background-image: url(${ImageCheckRed});
    background-size: cover;
    background-position: top left;
    background-repeat: no-repeat;
  }
`;

const RequestButtonWrap = styled.div`
  display: inline-block;
  min-width: 300px;
  margin: ${Dimens.medium}px auto;
  ${media.phone`
    display: block;
    min-width: auto;
  `};
`;

const SnsWrap = styled.div`
  margin-top: ${Dimens.medium2_32}px;
`;

const SnsTitle = styled.div`
  font-size: ${FontSizes.small}px;
  color: ${Colors.black};
  margin-bottom: ${Dimens.medium}px;
`;

const SnsUl = styled.ul`
  display: flex;
  width: 100px;
  margin: auto;
`;

const SnsLi = styled.li`
  margin: auto;
  max-width: ${Dimens.medium3_40}px;
`;

const LinkLogo = styled.a`
  display: block;
  &:active {
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      opacity: 0.8;
    }
  `};
`;

const ImageLogo = styled.img`
  width: 100%;
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
  priceTatami,
  priceFull,
  user,
  description,
  map,
  address,
  type,
  furniture,
  baggage,
  delivery,
  meeting,
  supplement,
  id,
  name,
  recommend,
  requestButtondisabled,
  requestButtonloading,
  requestButtononClick,
  onKeyDownButtonRequest,
}) => (
  <Container confirm={confirm}>
    <Image images={images} />
    <SpaceDetailWrap>
      <LeftWrap>
        <SpaceTitleWrapper>
          <AddressText>{`${pref} ${city} ${town}`}</AddressText>
          <ContentText>{name || ''}</ContentText>
          <PriceText>
            {priceTatami || priceFull}
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
        <Price full={priceFull} tatami={priceTatami} />
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
      </LeftWrap>
      <RightWrap>
        <RequestCard>
          気になるスペースを見つけたら？
          <RequestTitle>ホストに相談しよう</RequestTitle>
          <RequestCheckWrap>
            <RequestCheckTitle>よくある確認事項</RequestCheckTitle>
            <RequestCheckUl>
              <RequestCheckLi>預けたい日程は決まっているか</RequestCheckLi>
              <RequestCheckLi margin>荷物の量はだいたい決まっているか</RequestCheckLi>
              <RequestCheckLi>荷物の出し入れは頻繁に行うか</RequestCheckLi>
            </RequestCheckUl>
          </RequestCheckWrap>
          <RequestButtonWrap>
            <Button
              center
              primary
              fontbold
              fill={1}
              disabled={requestButtondisabled}
              loading={requestButtonloading}
              onClick={requestButtononClick}
              onKeyDown={onKeyDownButtonRequest}
            >
              リクエストを送る
            </Button>
          </RequestButtonWrap>
          リクエストを送る
          リクエストを送ることで、あなたがスペースに興味を持っていることがホストに伝わります。
        </RequestCard>
        <SnsWrap>
          <SnsTitle>SNSでシェア</SnsTitle>
          <SnsUl>
            <SnsLi>
              <LinkLogo
                component={Link}
                href={`https://twitter.com/intent/tweet?url=https://monooq.com/space/${id}&text=${name}｜モノオク&hashtags=モノオク`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImageLogo src={ImageSnsTwitter} alt="icon-twitter" />
              </LinkLogo>
            </SnsLi>
            <SnsLi>
              <LinkLogo
                component={Link}
                href={`https://www.facebook.com/sharer/sharer.php?u=https://monooq.com/space/${id}&quote=${name}｜モノオク`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImageLogo src={ImageSnsFacebook} alt="icon-facebook" />
              </LinkLogo>
            </SnsLi>
          </SnsUl>
        </SnsWrap>
      </RightWrap>
    </SpaceDetailWrap>
  </Container>
);
