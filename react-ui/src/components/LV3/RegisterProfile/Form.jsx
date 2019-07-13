// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import DisplayErrors from 'components/LV2/DisplayErrors';

const Title = styled.div`
  text-align: center;
  margin-top: ${Dimens.small}px;
  ${media.phone`
    text-align: left;
    margin-top: ${Dimens.xxsmall}px;
  `};
`;

const Image = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `};
`;

const Name = styled.div`
  margin-top: ${Dimens.medium1}px;
  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `};
`;

const PrefCode = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${media.phone`
    margin-top: ${Dimens.medium1}px;
  `};
`;

const Profile = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${media.phone`
    margin-top: ${Dimens.medium1}px;
  `};
`;

const PhoneNumber = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${media.phone`
    margin-top: ${Dimens.medium1}px;
  `};
`;

const Button = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

type PropTypes = {
  errors: Array<Array<string>>,
  title: React.Element<*>,
  image: React.Element<*>,
  name: React.Element<*>,
  prefCode: React.Element<*>,
  profile: React.Element<*>,
  phoneNumber: React.Element<*>,
  button: React.Element<*>,
  story?: boolean,
};

export default ({
  errors,
  title,
  image,
  name,
  prefCode,
  profile,
  phoneNumber,
  button,
}: PropTypes) => (
  <Fragment>
    <Title>{title}</Title>
    <Image>{image}</Image>
    <Name>
      {name}
      <DisplayErrors keyName="name_errors" errors={errors.name} />
    </Name>
    <PrefCode>
      {prefCode}
      <DisplayErrors keyName="prefCode_errors" errors={errors.prefCode} />
    </PrefCode>
    <Profile>
      {profile}
      <DisplayErrors keyName="profile_errors" errors={errors.profile} />
    </Profile>
    <PhoneNumber>
      {phoneNumber}
      <DisplayErrors keyName="phoneNumber_errors" errors={errors.phoneNumber} />
    </PhoneNumber>
    <Button>{button}</Button>
  </Fragment>
);
