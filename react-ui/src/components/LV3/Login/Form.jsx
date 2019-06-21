// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors } from 'variables';

const Logo = styled.div`
  text-align: center;
`;

const Title = styled.div`
  text-align: center;
  margin-top: ${Dimens.small}px;
  ${media.phone`
    text-align: left;
    margin-top: ${Dimens.xxsmall}px;
  `};
`;

const Email = styled.div`
  margin-top: ${Dimens.medium2_35}px;
  ${media.phone`
    margin-top: ${Dimens.medium1}px;
  `};
`;

const Pass = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const Failed = styled.div`
  text-align: center;
  margin-top: ${Dimens.xsmall}px;
`;

const Remind = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium2_35}px;
  ${media.phone`
    margin-top: ${Dimens.medium2}px;
  `};
`;

const Login = styled.div`
  margin-top: ${Dimens.medium2_35}px;
  ${media.phone`
    margin-top: ${Dimens.medium2}px;
  `};
`;

const Facebook = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const ToSignup = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium}px;
  padding-top: ${Dimens.medium}px;
  border-top: 1px solid ${Colors.borderGray};
`;

type PropTypes = {
  logo: React.Element<*>,
  title: React.Element<*>,
  email: React.Element<*>,
  pass: React.Element<*>,
  failed: React.Element<*>,
  remind: React.Element<*>,
  login: React.Element<*>,
  facebook: React.Element<*>,
  toSignup: React.Element<*>,
};

export default ({
  logo,
  title,
  email,
  pass,
  failed,
  remind,
  login,
  facebook,
  toSignup,
}: PropTypes) => (
  <Fragment>
    <Logo>{logo}</Logo>
    <Title>{title}</Title>
    <Email>{email}</Email>
    <Pass>{pass}</Pass>
    <Failed>{failed}</Failed>
    <Remind>{remind}</Remind>
    <Login>{login}</Login>
    <Facebook>{facebook}</Facebook>
    <ToSignup>{toSignup}</ToSignup>
  </Fragment>
);
