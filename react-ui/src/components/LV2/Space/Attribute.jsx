// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/InlineText';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  width: 100%;
  min-height: 20px;
  padding: ${Dimens.medium1}px;
  border-top: 1px solid ${Colors.borderGray};
  margin: 35px auto;
  &:not(:first-child) {
    ${props =>
      props.hostinfo &&
      `
      margin: auto;
      border: 1px solid #DBDBDB;
      border-radius: 5px;
    `};
  }
  &::after {
    clear: both;
    content: '';
    display: block;
  }
  ${props =>
    props.message &&
    `
    padding: 0px;
    margin: 5px auto;
    border: none;
  `};

  ${media.phone`
    display: block;
    padding: ${Dimens.medium}px;
    ${props =>
      props.message &&
      `
      padding: 0px;
      margin: 0px auto;
    `};
  `};
`;

const HostImageContainer = styled.span`
  float: left;
`;

const HostNameContainer = styled.div`
  float: left;
  margin-top: 2px;
  margin-left: 15px;
  ${media.phone`
    max-width: 175px;
    margin-top: 2px;
    font-size: ${FontSizes.small_12}px;
  `};
`;

const ProfileContainer = styled.div`
  clear: both;
  vertical-align: middle;
  padding-top: ${Dimens.small2}px;
  ${media.phone`
    margin-top: 2px;
    font-size: ${FontSizes.small_12}px;
  `};
`;

type PropTypes = {
  title: string,
  headContent?: React.Element<*>,
  contentHostName: React.Element<*>,
  contentProfile?: React.Element<*>,
};

export default (props: PropTypes) => (
  <Container hostinfo={props.hostinfo} message={props.message}>
    <HostImageContainer>
      {props.headContent ? props.headContent : <InlineText.Base>{props.title}</InlineText.Base>}
    </HostImageContainer>
    <HostNameContainer>{props.contentHostName}</HostNameContainer>
    <ProfileContainer>{props.contentProfile}</ProfileContainer>
  </Container>
);
