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

const Terms = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium2_35}px;
  ${media.phone`
    margin-top: ${Dimens.medium2}px;
  `};
`;

const Next = styled.div`
  margin-top: ${Dimens.medium2_35}px;
  ${media.phone`
    margin-top: ${Dimens.medium2}px;
  `};
`;

const OtherSignup = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium}px;
`;

const Facebook = styled.div`
  margin-top: ${Dimens.small}px;
`;

const ToLogin = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium}px;
  padding-top: ${Dimens.medium}px;
  border-top: 1px solid ${Colors.borderGray};
`;

type PropTypes = {
  logo: React.Element<*>,
  title: React.Element<*>,
  email: React.Element<*>,
  emailError: Array<React.Element<*>>,
  pass: React.Element<*>,
  passError: Array<React.Element<*>>,
  terms: React.Element<*>,
  next: React.Element<*>,
  otherSignup: React.Element<*>,
  facebook: React.Element<*>,
  toLogin: React.Element<*>,
};

export default ({
  logo,
  title,
  email,
  emailError,
  pass,
  passError,
  terms,
  next,
  otherSignup,
  facebook,
  toLogin,
}: PropTypes) => (
  <Fragment>
    <Logo>{logo}</Logo>
    <Title>{title}</Title>
    <Email>{email}</Email>
    {emailError.map((dom, i) => (
      <Failed key={`email_error_text_${i}`.toString()}>{dom}</Failed>
    ))}
    <Pass>{pass}</Pass>
    {passError.map((dom, i) => (
      <Failed key={`password_error_text_${i}`.toString()}>{dom}</Failed>
    ))}
    <Terms>{terms}</Terms>
    <Next>{next}</Next>
    <OtherSignup>{otherSignup}</OtherSignup>
    <Facebook>{facebook}</Facebook>
    <ToLogin>{toLogin}</ToLogin>
  </Fragment>
);
