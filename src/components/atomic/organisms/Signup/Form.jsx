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

const Terms = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium}px;
`;

const Next = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const OtherSignup = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium2}px;
`;

const Facebook = styled.div`
  margin-top: ${Dimens.small}px;
`;

const ToLogin = styled.div`
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
  passConfirm: React.Element<*>,
  terms: React.Element<*>,
  login: React.Element<*>,
  otherSignup: React.Element<*>,
  facebook: React.Element<*>,
  toLogin: React.Element<*>,
}

export default (props: PropTypes) => (
  <Fragment>
    <Logo>{props.logo}</Logo>
    <Title>{props.title}</Title>
    <Email>{props.email}</Email>
    <Pass>{props.pass}</Pass>
    <Pass>{props.passConfirm}</Pass>
    <Terms>{props.terms}</Terms>
    <Next>{props.login}</Next>
    <OtherSignup>{props.otherSignup}</OtherSignup>
    <Facebook>{props.facebook}</Facebook>
    <ToLogin>{props.toLogin}</ToLogin>
  </Fragment>
);
