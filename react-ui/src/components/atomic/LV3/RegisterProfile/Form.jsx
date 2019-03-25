// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import GoogleTagManager from 'components/atomic/LV1/GTM';
import InlineText from 'components/atomic/LV1/InlineText';

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
  title: React.Element<*>,
  image: React.Element<*>,
  name: React.Element<*>,
  nameErrors: Array<string>,
  prefCode: React.Element<*>,
  prefCodeErrors: Array<string>,
  profile: React.Element<*>,
  profileErrors: Array<string>,
  phoneNumber: React.Element<*>,
  phoneNumberErrors: Array<string>,
  button: React.Element<*>,
  story?: boolean,
};

export default (props: PropTypes) => (
  <Fragment>
    <Title>{props.title}</Title>
    <Image>{props.image}</Image>
    <Name>
      {props.name}
      {displayErrors('name_errors', props.nameErrors)}
    </Name>
    <PrefCode>
      {props.prefCode}
      {displayErrors('prefCode_errors', props.prefCodeErrors)}
    </PrefCode>
    <Profile>
      {props.profile}
      {displayErrors('profile_errors', props.profileErrors)}
    </Profile>
    <PhoneNumber>
      {props.phoneNumber}
      {displayErrors('phoneNumber_errors', props.phoneNumberErrors)}
    </PhoneNumber>
    <Button>{props.button}</Button>
    {!props.story && <GoogleTagManager event="userRegistered" />}
  </Fragment>
);
