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
  emailError: Array<React.Element<*>>,
  pass: React.Element<*>,
  passError: Array<React.Element<*>>,
  passConfirm: React.Element<*>,
  passConfirmError: Array<React.Element<*>>,
  terms: React.Element<*>,
  next: React.Element<*>,
  otherSignup: React.Element<*>,
  facebook: React.Element<*>,
  toLogin: React.Element<*>,
  signUpError: React.Element<*>,
};

export default (props: PropTypes) => (
  <Fragment>
    <Logo>{props.logo}</Logo>
    <Title>{props.title}</Title>
    <Email>{props.email}</Email>
    {props.emailError.map((dom, i) => <Failed key={`email_error_text_${i}`}>{dom}</Failed>)}
    <Pass>{props.pass}</Pass>
    {props.passError.map((dom, i) => <Failed key={`password_error_text_${i}`}>{dom}</Failed>)}
    <Pass>{props.passConfirm}</Pass>
    {props.passConfirmError.map((dom, i) => (
      <Failed key={`password_confirm_error_text_${i}`}>{dom}</Failed>
    ))}
    <Terms>{props.terms}</Terms>
    {props.signUpError && <Failed>{props.signUpError}</Failed>}
    <Next>{props.next}</Next>
    <OtherSignup>{props.otherSignup}</OtherSignup>
    <Facebook>{props.facebook}</Facebook>
    <ToLogin>{props.toLogin}</ToLogin>
  </Fragment>
);
