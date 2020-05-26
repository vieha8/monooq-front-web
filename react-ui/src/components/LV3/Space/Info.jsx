import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { getBreadths } from 'helpers/breadths';
import { receiptTypeList } from 'helpers/receiptTypes';
import { media } from 'helpers/style/media-query';
import SpaceMap from 'components/LV1/SpaceMap';
import InlineText from 'components/LV1/Texts/InlineText';
import Availability from 'components/LV1/Texts/Availability';
import Tag from 'components/LV1/Texts/Tag';
import Description from 'components/LV2/Space/Description';
import BreadcrumbsList from 'components/LV2/Lists/BreadcrumbsList';
import Map from 'components/LV2/Space/Map';
import Recommend from 'components/LV2/Space/Recommend';
import Receive from 'components/LV2/Space/Receive';
import InfoHost from 'components/LV2/Space/InfoHost';
import Price from 'components/LV3/Space/Price';
import Attention from './Attention';

const AvailabilityWrap = styled.div`
  margin: 0 auto ${Dimens.medium}px;
`;

const SpaceTitleWrap = styled.div``;

const SpaceTitle = styled(InlineText.Base)`
  display: block;
  margin: 5px auto;
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  ${media.tablet`
    font-size: ${FontSizes.medium}px;
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

export default ({
  confirm,
  space,
  id,
  name,
  sizeType,
  tagList,
  breadcrumbsList,
  recommend,
  user,
  userMeta,
}) => (
  <Fragment>
    <AvailabilityWrap>
      <Availability status={space.status} />
    </AvailabilityWrap>
    <SpaceTitleWrap>
      <SpaceTitle as="h1">{name || ''}</SpaceTitle>
      {breadcrumbsList && (
        <BreadcrumbsList
          breadcrumbsList={breadcrumbsList}
          separatorLandscape
          fontColor={Colors.lightGray3}
        />
      )}
    </SpaceTitleWrap>
    <InfoHost {...user} infoHost isNoProfile replyRate={userMeta ? userMeta.replyRate : null} />
    <Description title="スペース概要" text={space.introduction} />
    {getBreadths(sizeType) !== '' && (
      <Description
        title="スペースの広さ"
        text={space.tatami || space.tatami === '0' ? `${space.tatami}畳` : getBreadths(sizeType)}
      />
    )}
    <Price full={space.priceFull} tatami={space.priceTatami} />
    {tagList && tagList.length > 0 && (
      <Fragment>
        <SectionHeader>設備・条件</SectionHeader>
        <TagListWrap>
          <Tag tagList={tagList} />
        </TagListWrap>
      </Fragment>
    )}
    <Map
      address={`${space.addressPref}${space.addressCity}${space.addressTown}`}
      map={<SpaceMap lat={space.lat} lng={space.lng} />}
    />
    <InfoHost {...user} infoHost isTitle replyRate={userMeta ? userMeta.replyRate : null} />
    <Receive
      isDelivery={
        space.receiptType === receiptTypeList.Both || space.receiptType === receiptTypeList.Delivery
      }
      isMeeting={
        space.receiptType === receiptTypeList.Both || space.receiptType === receiptTypeList.Meeting
      }
    />
    <Attention />
    {!confirm && recommend && recommend.length > 0 && (
      <Recommend id={id} name={name} recommend={recommend} />
    )}
  </Fragment>
);
