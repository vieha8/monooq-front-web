import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';
import { getBreadths } from 'helpers/breadths';
import { media, mediaMin } from 'helpers/style/media-query';
import InlineText from 'components/LV1/Texts/InlineText';
import Availability from 'components/LV1/Texts/Availability';
import Tag from 'components/LV1/Texts/Tag';
import SnsShare from 'components/LV2/SnsShare';
import Description from 'components/LV2/Space/Description';
import BreadcrumbsList from 'components/LV2/Lists/BreadcrumbsList';
import Image from 'components/LV2/Space/Image';
import Address from 'components/LV2/Space/Address';
import Receive from 'components/LV2/Space/Receive';
import InfoHost from 'components/LV2/Space/InfoHost';
import RequestApplication from 'components/LV3/RequestApplication';
import Price from 'components/LV3/Space/Price';
import ImageCheckRed from 'images/check-circle-red.svg';
import ImageLogoPayCredit from 'images/logo-pay-credit.svg';
import ImageLogoPayEcontext from 'images/logo-pay-econtext.svg';

import SearchResult from '../SearchResult';

const Wrap = styled.div`
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
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: auto;

  ${media.tablet`
    width: 80%;
    max-width: 500px;
  `};
  ${media.phone`
    width: 100%;
  `};

  ${mediaMin.phone`
    &::before,
    &::after {
      content: '';
      position: absolute;
      z-index: 1;
      width: calc((100vw - 100%) / 2);
      height: 100%;
      top: 0;
      background-color: ${Colors.white};
      opacity: 0.3;
    }

    &::before {
      left: calc(-1 * (100vw - 100%) / 2);
    }

    &::after {
      right: calc(-1 * (100vw - 100%) / 2);
    }
  `}
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

const SpaceTitle = styled(InlineText.Base)`
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
  position: relative;
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
  ${props =>
    props.isBottom &&
    `
    position: absolute;
    top: unset;
    bottom: 0;
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

const LinkStyled = styled.a`
  margin-right: ${Dimens.medium}px;
  &:active {
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      opacity: 0.8;
    }
  `};
  ${media.phone`
    display: block;
    margin:  ${Dimens.xsmall}px auto 0;
  `};
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

const getCaptionMessage = () => {
  return 'リクエストを送ることで、あなたがスペースに興味を持っていることがホストに伝わります。';
};

export default ({
  confirm,
  isModalOpen,
  handleModalOpen,
  handleModalClose,
  images,
  status,
  priceTatami,
  priceFull,
  tagList,
  breadcrumbsList,
  user,
  description,
  isRoom,
  sizeType,
  map,
  address,
  delivery,
  meeting,
  id,
  name,
  recommend,
  isOverTopView,
  isBottom,
  buttonRequestCreatedisabled,
  usage,
  onChangeUsage,
  breadth,
  onChangeBreadth,
  startDate,
  onChangeStartDateYear,
  onChangeStartDateMonth,
  onChangeStartDateDay,
  endDate,
  onChangeEndDateYear,
  onChangeEndDateMonth,
  onChangeEndDateDay,
  packageContents,
  onChangePackageContents,
  notes,
  onChangeNotes,
  errors,
  buttonRequestDisabled,
  loading,
  onClick,
  onKeyDownButtonMessage,
}) => (
  <Wrap confirm={confirm}>
    <ImageSpaceWrap>
      <Image images={images} />
    </ImageSpaceWrap>
    <SpaceDetailWrap>
      <LeftWrap>
        <AvailabilityWrap>
          <Availability status={status} />
        </AvailabilityWrap>
        <SpaceTitleWrapper>
          <SpaceTitle as="h1">{name || ''}</SpaceTitle>
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
        {sizeType && getBreadths(sizeType) !== '' && (
          <Fragment>
            <SectionHeader>スペースの広さ</SectionHeader>
            <Description content={getBreadths(sizeType)} />
          </Fragment>
        )}
        <SectionHeader>料金の目安</SectionHeader>
        <Price sizeType={sizeType} full={priceFull} tatami={priceTatami} />
        {tagList && tagList.length > 0 && (
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
        <InfoHost {...user} infoHost />
        <SectionHeader>荷物の受け取り方法</SectionHeader>
        <Receive isDelivery={delivery} isMeeting={meeting} />
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
            >
              クレジットカード決済の手順
            </LinkStyled>
            <LinkStyled
              component={Link}
              href="https://help.monooq.com/ja/articles/3124622-"
              target="_blank"
              rel="noopener noreferrer"
            >
              コンビニ払い・Pay-easy決済の手順
            </LinkStyled>
            <SectionTitle>決済可能なお支払い方法</SectionTitle>
            <LogoPayWrap>
              <ImageLogoPay src={ImageLogoPayCredit} maxWidth={110} credit alt="icon-logo-credit" />
              <ImageLogoPay src={ImageLogoPayEcontext} maxWidth={240} alt="icon-logo-econtext" />
            </LogoPayWrap>
          </SectionWrap>
          <SectionWrap>
            <SectionTitle>トラブル時の補償対応について</SectionTitle>
            サービス外で発生した破損・トラブルには対応致しかねます。スペースを利用する際の契約や連絡は、原則モノオクのメッセージ画面で行うよう、あらかじめご了承ください。
          </SectionWrap>
        </AttentionWrap>
        {!confirm && recommend && recommend.length > 0 && (
          <Fragment>
            <SnsShare id={id} name={name} isOnlyTabSp />
            <SectionHeader>このスペースをみた人はこんなスペースもみています</SectionHeader>
            <RecommendSpacesWrap>
              <SearchResult spaces={recommend} narrow />
            </RecommendSpacesWrap>
          </Fragment>
        )}
      </LeftWrap>
      <RightWrap>
        <RightInner
          isOverTopView={isOverTopView && !isModalOpen}
          isBottom={isBottom && !isModalOpen}
          confirm={confirm}
        >
          <RequestCard>
            気になるスペースを見つけたら？
            <RequestTitle>ホストに相談しよう</RequestTitle>
            {isModalOpen ? (
              getCaptionMessage()
            ) : (
              <RequestCheckWrap>
                <RequestCheckTitle>よくある確認事項</RequestCheckTitle>
                <RequestCheckUl>
                  <RequestCheckLi>預けたい日程は決まっているか</RequestCheckLi>
                  <RequestCheckLi margin>荷物の量はだいたい決まっているか</RequestCheckLi>
                  <RequestCheckLi>荷物の出し入れは頻繁に行うか</RequestCheckLi>
                </RequestCheckUl>
              </RequestCheckWrap>
            )}
            <RequestButtonWrap>
              <RequestApplication
                confirm={confirm}
                errors={errors}
                isPC
                isModalOpen={isModalOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                priceFull={priceFull}
                priceTatami={priceTatami}
                buttonRequestCreatedisabled={buttonRequestCreatedisabled}
                disabled={buttonRequestDisabled}
                loading={loading}
                onClick={onClick}
                onKeyDownButtonMessage={onKeyDownButtonMessage}
                isRoom={isRoom}
                usage={usage}
                onChangeUsage={onChangeUsage}
                breadth={breadth}
                onChangeBreadth={onChangeBreadth}
                startDate={startDate}
                onChangeStartDateYear={onChangeStartDateYear}
                onChangeStartDateMonth={onChangeStartDateMonth}
                onChangeStartDateDay={onChangeStartDateDay}
                endDate={endDate}
                onChangeEndDateYear={onChangeEndDateYear}
                onChangeEndDateMonth={onChangeEndDateMonth}
                onChangeEndDateDay={onChangeEndDateDay}
                packageContents={packageContents}
                onChangePackageContents={onChangePackageContents}
                notes={notes}
                onChangeNotes={onChangeNotes}
              />
            </RequestButtonWrap>
            {!isModalOpen && getCaptionMessage()}
          </RequestCard>
          {!confirm && <SnsShare id={id} name={name} />}
        </RightInner>
      </RightWrap>
    </SpaceDetailWrap>
  </Wrap>
);
