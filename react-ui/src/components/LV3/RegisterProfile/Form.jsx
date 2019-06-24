// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/LV1/InlineText';

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

function displayErrors(key: string, errors: Array<string>) {
  return (
    Array.isArray(errors) &&
    errors.map((e, i) => (
      <div key={`${key}_${i}`.toString()}>
        <InlineText.Small color={Colors.error}>{e}</InlineText.Small>
      </div>
    ))
  );
}

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
      {displayErrors('name_errors', errors.name)}
    </Name>
    <PrefCode>
      {prefCode}
      {displayErrors('prefCode_errors', errors.prefCode)}
    </PrefCode>
    <Profile>
      {profile}
      {displayErrors('profile_errors', errors.profile)}
    </Profile>
    <PhoneNumber>
      {phoneNumber}
      {displayErrors('phoneNumber_errors', errors.phoneNumber)}
    </PhoneNumber>
    <Button>{button}</Button>
  </Fragment>
);
