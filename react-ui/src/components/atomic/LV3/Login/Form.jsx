// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, Colors } from 'variables';

const Logo = styled.div`
  text-align: center;
`;

const Title = styled.div`
  text-align: center;
  margin-top: ${Dimens.small2}px;
`;

const Email = styled.div`
  margin-top: ${Dimens.medium2}px;
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
  margin-top: ${Dimens.medium}px;
`;

const Login = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const Facebook = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const ToSignup = styled.div`
  text-align: center;
  margin-top: ${Dimens.small2}px;
  padding-top: ${Dimens.small2}px;
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

export default (props: PropTypes) => (
  <Fragment>
    <Logo>{props.logo}</Logo>
    <Title>{props.title}</Title>
    <Email>{props.email}</Email>
    <Pass>{props.pass}</Pass>
    <Failed>{props.failed}</Failed>
    <Login>{props.login}</Login>
    <Facebook>{props.facebook}</Facebook>
    <ToSignup>{props.toSignup}</ToSignup>
    <Remind>{props.remind}</Remind>
  </Fragment>
);
