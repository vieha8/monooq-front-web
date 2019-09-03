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
  display: inline-block;
  vertical-align: top;
  padding: 0 0 ${Dimens.medium_20}px;
  ${props =>
    props.index % 2 === 1 &&
    `
    padding: 0 0 ${Dimens.medium_20}px ${Dimens.medium}px;
  `};
  ${media.tablet`
    width: 50%;
    ${props =>
      props.index % 2 === 1 &&
      `
      padding: 0 0 ${Dimens.medium_20}px ${Dimens.medium}px;
    `};
  `};
  ${media.phone`
    width: 100%;
    padding: 0 0 ${Dimens.medium1}px;
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
          <SpaceListContainer>
            <HostName spaces>{`${formatName(name)}さんのスペース`}</HostName>
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
