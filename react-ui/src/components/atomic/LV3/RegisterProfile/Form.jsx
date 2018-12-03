// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import GoogleTagManager from 'components/GTM';

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

const Area = styled.div`
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
  title: React.Element<*>,
  image: React.Element<*>,
  name: React.Element<*>,
  area: React.Element<*>,
  profile: React.Element<*>,
  phoneNumber: React.Element<*>,
  button: React.Element<*>,
};

export default (props: PropTypes) => (
  <Fragment>
    <Title>{props.title}</Title>
    <Image>{props.image}</Image>
    <Name>{props.name}</Name>
    <Area>{props.area}</Area>
    <Profile>{props.profile}</Profile>
    <PhoneNumber>{props.phoneNumber}</PhoneNumber>
    <Button>{props.button}</Button>
    <GoogleTagManager event="userRegistered" />
  </Fragment>
);
