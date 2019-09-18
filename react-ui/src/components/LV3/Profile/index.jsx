// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Colors, FontSizes, Dimens } from 'variables';
import { getPrefecture } from 'helpers/prefectures';
import { formatName } from 'helpers/string';
import InlineText from 'components/LV1/Texts/InlineText';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';
import SearchResultItem from 'components/LV2/Items/SearchResultItem';

const IMAGE_SIZE = 100;

const Container = styled.div`
  margin: 27px auto 0px;
`;

const User = styled.div``;

const ImageWrap = styled.div`
  float: left;
`;

const InfoTopWrap = styled.div`
  float: left;
  width: calc(100% - 120px);
  margin: ${Dimens.xxsmall_5}px auto auto ${Dimens.medium_20}px;
  ${media.phoneSmall`
    width: calc(100% - 110px);
    margin: ${Dimens.xxsmall_5}px auto auto ${Dimens.small_10}px;
  `};
`;

const HostName = styled.div`
  font-size: ${FontSizes.medium2_26}px;
  margin-bottom: ${Dimens.small_10}px;
  ${media.phoneSmall`
    font-size: ${FontSizes.medium_18}px;
  `};
  ${props =>
    props.spaces &&
    `
    font-size: ${FontSizes.medium1}px;
  `};
`;

const ResidenceText = styled.div`
  margin-top: ${Dimens.small}px;
  color: ${Colors.black};
`;

const LastLoginText = styled.div`
  margin-top: ${Dimens.small}px;
  color: ${Colors.black};
`;

const Profile = styled.div`
  clear: both;
  padding: ${Dimens.medium2}px 0px;
  white-space: pre-wrap;
`;

const SpaceListContainer = styled.div``;

const Cell = styled.div`
  width: calc(25% - ${Dimens.small2}px);
  display: inline-block;
  vertical-align: top;
  margin: 0 ${Dimens.medium}px ${Dimens.medium2_32}px 0;
  &:nth-child(4n) {
    width: calc(25% - ${Dimens.small2}px);
    margin: 0 0 ${Dimens.medium2_32}px;
  }

  ${media.tablet`
    width: calc(50% - ${Dimens.small}px);
    max-width: 100%;
    &:nth-child(2n) {
      width: calc(50% - ${Dimens.small}px);
      margin: 0 0 ${Dimens.medium2_32}px;
    }
  `};

  ${media.phone`
    width: 100%;
    max-width: 100%;
    margin: 0 0 ${Dimens.large2_65}px;
    &:nth-child(2n) {
      width: 100%;
      margin: 0 0 ${Dimens.large2_65}px;
    }
    ${props =>
      props.isTag &&
      `
      width: calc(50% - 3.5px);
      margin: 0 ${Dimens.xsmall_7}px ${Dimens.medium2_35}px 0;
      &:nth-child(2n) {
        width: calc(50% - 3.5px);
        margin: 0 0 ${Dimens.medium2_35}px;
      }
    `};
  `};
`;

type PropTypes = {
  image: string,
  name: string,
  prefCode: string,
  lastLoginAt: Date,
  profile: string,
  spaces: Array<{
    id: number,
    user: {
      id: number,
      firebaseUid: string,
      imageUrl: string,
      name: string,
      profile: string,
    },
    addressPref: string,
    addressCity: string,
    addressTown: string,
    title: string,
    images: Array<{
      imageUrl: string,
    }>,
    introduction: string,
    type: number,
    isFurniture: boolean,
    about: string,
    receiptAbout: string,
    priceFull: number,
    priceHalf: number,
    priceQuarter: number,
    location: {
      lat: number,
      lng: number,
    },
    status: string,
  }>,
};

export default ({ image, name, prefCode, lastLoginAt, profile, spaces }: PropTypes) => (
  <Fragment>
    <Container>
      <User>
        <ImageWrap>
          <ImageAvatar src={image} alt={name} size={IMAGE_SIZE} />
        </ImageWrap>
        <InfoTopWrap>
          <HostName>{`${formatName(name)}さん`}</HostName>
          <ResidenceText>
            <InlineText.Small>{`${getPrefecture(prefCode)}在住`}</InlineText.Small>
          </ResidenceText>
          <LastLoginText>
            <InlineText.Small>{`最終ログイン日:${lastLoginAt}`}</InlineText.Small>
          </LastLoginText>
        </InfoTopWrap>
        <Profile>
          <InlineText.Base>{profile}</InlineText.Base>
        </Profile>
      </User>
      {spaces.length > 0 && (
        <Fragment>
          <HostName spaces>{`${formatName(name)}さんのスペース`}</HostName>
          <SpaceListContainer>
            {spaces.map((space, i) => (
              <Cell key={`result_list_result_item_${i}`.toString()} index={i}>
                <SearchResultItem {...space} />
              </Cell>
            ))}
          </SpaceListContainer>
        </Fragment>
      )}
    </Container>
  </Fragment>
);
