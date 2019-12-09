import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import Availability from 'components/LV1/Texts/Availability';
import Tag from 'components/LV1/Texts/Tag';
import Description from 'components/LV2/Space/Description';
import BreadcrumbsList from 'components/LV2/Lists/BreadcrumbsList';
import Image from 'components/LV2/Space/Image';
import Address from 'components/LV2/Space/Address';
import Receive from 'components/LV2/Space/Receive';
import InfoHost from 'components/LV2/Space/InfoHost';
import Price from 'components/LV3/Space/Price';
import ReactGA from 'react-ga';
import ImageCheckRed from 'images/check-circle-red.svg';
import ImageSnsTwitter from 'images/sns-twitter-circle.svg';
import ImageSnsFacebook from 'images/sns-facebook-circle.svg';
import ImageLogoPayCredit from 'images/logo-pay-credit.svg';
import ImageLogoPayEcontext from 'images/logo-pay-econtext.svg';

import SearchResult from '../SearchResult';

const Container = styled.div`
  margin: auto;
  padding: 0;
  ${media.tablet`
    ${props =>
      props.confirm &&
      `
      padding: 0 0 140px;
    `};
  `};
`;

const ImageSpaceWrap = styled.div`
  width: 100%;
  max-width: 700px;
  margin: auto;
`;

const SpaceDetailWrap = styled.div`
  display: flex;
  max-width: 1000px;
  margin: auto;
  padding: ${Dimens.medium2_36}px ${Dimens.medium}px 0;
  ${media.tablet`
    padding: ${Dimens.medium}px ${Dimens.medium}px 0;
  `};
`;

const LeftWrap = styled.div`
  width: 100%;
  max-width: 660px;
  padding-right: ${Dimens.medium4_50}px;
  ${media.tablet`
    padding-right: 0px;
  `};
`;

const AvailabilityWrap = styled.div`
  margin: ${Dimens.medium}px auto;
`;

const SpaceTitleWrapper = styled.div``;

const SpaceTitle = styled(InlineText.H1)`
  display: block;
  margin: 5px auto;
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  ${media.tablet`
    font-size: ${FontSizes.medium}px;
  `};
`;

const LogoPayWrap = styled.div`
  width: 100%;
`;

const ImageLogoPay = styled.img`
  display: inline-block;
  width: 100%;
  height: auto;
  ${props =>
    props.credit &&
    `
    margin-right:  ${Dimens.medium3_40}px;
  `};
  ${props =>
    props.maxWidth &&
    `
    max-width:  ${props.maxWidth}px;
  `};
  ${media.phone`
    display: block;
    margin:  ${Dimens.small2}px 0 0;
  `};
`;

const RightWrap = styled.div`
  width: 100%;
  max-width: 340px;
  padding-right: ${Dimens.small_10}px;
  font-size: ${FontSizes.small_12}px;
  text-align: center;
  ${media.tablet`
    display: none;
  `};
`;

const RightInner = styled.div`
  ${props =>
    props.isOverTopView &&
    `
    position: fixed;
    max-width: 330px;
    top: ${props.confirm ? `190` : `100`}px;
    z-index: ${ZIndexes.frontPartsOverFooter};
    background-color: ${Colors.white};
    border-radius: ${Dimens.xxsmall}px;
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
  margin: ${Dimens.medium2_32}px auto ${Dimens.medium}px;
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

const LinkStyled = styled.a`
  display: block;
  ${props =>
    props.inlinePc &&
    `
    display: inline-block;
    margin-right:  ${Dimens.medium}px;
  `};
  &:active {
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      opacity: 0.8;
    }
  `};
  ${media.phone`
    ${props =>
      props.inlinePc &&
      `
      display: block;
      margin:  ${Dimens.xsmall}px auto 0;
    `};
  `};
`;

const ImageLogo = styled.img`
  width: 100%;
`;

const SectionHeader = styled.div`
  margin: 0 auto;
  padding: ${Dimens.medium2}px 0 0;
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
  ${media.phone`
    padding: ${Dimens.medium_20}px 0 0;
  `};
`;

const TagListWrap = styled.div`
  margin: ${Dimens.medium1}px auto 0;
`;

const MapWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const RecommendSpacesWrap = styled.div`
  margin: 20px auto;
`;

const AttentionWrap = styled.div``;

const SectionWrap = styled.div`
  margin: ${Dimens.medium1}px auto;
  font-size: ${FontSizes.small}px;
  line-height: normal;
`;

const SectionTitle = styled.div`
  margin: ${Dimens.medium_20}px auto ${Dimens.xsmall}px;
  font-weight: bold;
`;

export default ({
  confirm,
  images,
  pref,
  statusAvailability,
  priceTatami,
  priceFull,
  tagList,
  tagCustomList,
  breadcrumbsList,
  user,
  description,
  breadth,
  map,
  address,
  delivery,
  meeting,
  id,
  name,
  recommend,
  isOverTopView,
  requestButtondisabled,
  requestButtonloading,
  requestButtononClick,
  onKeyDownButtonRequest,
}) => (
  <Container confirm={confirm}>
    <ImageSpaceWrap>
      <Image images={images} />
    </ImageSpaceWrap>
    <SpaceDetailWrap>
      <LeftWrap>
        <AvailabilityWrap>
          <Availability status={statusAvailability} />
        </AvailabilityWrap>
        <SpaceTitleWrapper>
          <SpaceTitle>{name || ''}</SpaceTitle>
          {breadcrumbsList && (
            <BreadcrumbsList
              breadcrumbsList={breadcrumbsList}
              separatorLandscape
              fontColor={Colors.lightGray3}
            />
          )}
        </SpaceTitleWrapper>
        <InfoHost {...user} infoHost isNoProfile />
        <SectionHeader>スペース概要</SectionHeader>
        <Description content={description} />
        <SectionHeader>スペースの広さ</SectionHeader>
        <Description content={breadth} />
        <SectionHeader>料金の目安</SectionHeader>
        <Price full={priceFull} tatami={priceTatami} />
        {tagList && (
          <Fragment>
            <SectionHeader>設備・条件</SectionHeader>
            <TagListWrap>
              <Tag tagList={tagList} />
            </TagListWrap>
          </Fragment>
        )}
        <SectionHeader>アクセスマップ</SectionHeader>
        <MapWrapper>
          <Address content={address} />
          {map}
        </MapWrapper>
        <SectionHeader>ホストについて</SectionHeader>
        <InfoHost {...user} pref={pref} infoHost />
        <SectionHeader>荷物の受け取り方法</SectionHeader>
        <Receive isDelivery={delivery} isMeeting={meeting} />
        {!confirm && recommend && recommend.length > 0 && (
          <Fragment>
            <SectionHeader>このスペースをみた人はこんなスペースもみています</SectionHeader>
            <RecommendSpacesWrap>
              <SearchResult spaces={recommend} narrow />
            </RecommendSpacesWrap>
          </Fragment>
        )}
        <AttentionWrap>
          <SectionHeader>注意事項</SectionHeader>
          <SectionWrap>
            モノオクは、皆様の厚意や配慮の上で成り立つサービスです。お互いが気持ちよく利用できるよう丁寧なコミュニケーションを心がけましょう。
          </SectionWrap>
          <SectionWrap>
            <SectionTitle>お支払い方法について</SectionTitle>
            クレジットカード決済、コンビニ・Pay-easy決済がご利用できます。
            <br />
            一部クレジットカード・コンビニはご利用できない場合がございますので、以下の決済可能なお支払い方法をご確認ください。
            <SectionTitle>お支払いに関するヘルプ</SectionTitle>
            <LinkStyled
              component={Link}
              href="https://help.monooq.com/ja/articles/3124614-"
              target="_blank"
              rel="noopener noreferrer"
              inlinePc
            >
              クレジットカード決済の手順
            </LinkStyled>
            <LinkStyled
              component={Link}
              href="https://help.monooq.com/ja/articles/3124622-"
              target="_blank"
              rel="noopener noreferrer"
              inlinePc
            >
              コンビニ払い・Pay-easy決済の手順
            </LinkStyled>
            <SectionTitle>決済可能なお支払い方法</SectionTitle>
            <LogoPayWrap>
              <ImageLogoPay src={ImageLogoPayCredit} maxWidth={110} credit alt="icon-logo-credit" />
              <ImageLogoPay src={ImageLogoPayEcontext} maxWidth={240} alt="icon-logo-econtext" />
            </LogoPayWrap>
            <SectionTitle>長期利用の方向け：クレジットカードでの自動決済</SectionTitle>
            長期利用の際には、クレジットカード支払いにて毎月の自動決済が可能です。ホストとのメッセージ欄にて直接「自動決済の利用」の旨をお伝えください。
          </SectionWrap>
          <SectionWrap>
            <SectionTitle>トラブル時の補償対応について</SectionTitle>
            サービス外で発生した破損・トラブルには対応致しかねます。スペースを利用する際の契約や連絡は、原則モノオクのメッセージ画面で行うよう、あらかじめご了承ください。
          </SectionWrap>
        </AttentionWrap>
      </LeftWrap>
      <RightWrap>
        <RightInner isOverTopView={isOverTopView} confirm={confirm}>
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
                disabled={confirm || requestButtondisabled}
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
          {!confirm && (
            <SnsWrap>
              <SnsTitle>SNSでシェア</SnsTitle>
              <SnsUl>
                <SnsLi>
                  <LinkStyled
                    component={Link}
                    href={`https://twitter.com/intent/tweet?url=https://monooq.com/space/${id}&text=${name}｜モノオク&hashtags=モノオク`}
                    target="_blank"
                    rel="noopener noreferrer"
                    OnClick={() =>
                      ReactGA.event({
                        category: 'Share',
                        action: 'Push Twitter Share Button At Space',
                        value: id,
                      })
                    }
                  >
                    <ImageLogo src={ImageSnsTwitter} alt="icon-twitter" />
                  </LinkStyled>
                </SnsLi>
                <SnsLi>
                  <LinkStyled
                    component={Link}
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://monooq.com/space/${id}&quote=${name}｜モノオク`}
                    target="_blank"
                    rel="noopener noreferrer"
                    OnClick={() =>
                      ReactGA.event({
                        category: 'Share',
                        action: 'Push Facebook Share Button At Space',
                        value: id,
                      })
                    }
                  >
                    <ImageLogo src={ImageSnsFacebook} alt="icon-facebook" />
                  </LinkStyled>
                </SnsLi>
              </SnsUl>
            </SnsWrap>
          )}
        </RightInner>
      </RightWrap>
    </SpaceDetailWrap>
  </Container>
);
