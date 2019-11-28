import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  width: 100%;
  min-height: 20px;
  margin: ${Dimens.medium_20}px auto;
  &::after {
    clear: both;
    content: '';
    display: block;
  }
  ${props =>
    props.message &&
    `
    margin: 5px auto;
  `};

  ${media.phone`
    display: block;
    ${props =>
      props.message &&
      `
      margin: 0px auto;
    `};
  `};
`;

const HostImageContainer = styled.span`
  float: left;
`;

const HostNameContainer = styled.div`
  float: left;
  margin-top: ${Dimens.xsmall_7}px;
  margin-left: ${Dimens.small2_15}px;
  color: ${Colors.brandPrimary};
  font-weight: bold;
  ${props =>
    props.isNoProfile &&
    `
    margin-top: ${Dimens.small2_15}px;
  `};

  ${media.phone`
    max-width: 175px;
    margin-top: ${Dimens.small_10}px;
    font-size: ${FontSizes.small_12}px;
    ${props =>
      props.isNoProfile &&
      `
      margin-top: ${Dimens.medium_18}px;
    `};
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

export default ({
  infoHost,
  message,
  headContent,
  title,
  contentHostName,
  contentProfile,
  isNoProfile,
}) => (
  <Container infoHost={infoHost} message={message} isNoProfile={isNoProfile}>
    <HostImageContainer>
      {headContent || <InlineText.Base>{title}</InlineText.Base>}
    </HostImageContainer>
    <HostNameContainer isNoProfile={isNoProfile}>{contentHostName}</HostNameContainer>
    {!isNoProfile && <ProfileContainer>{contentProfile}</ProfileContainer>}
  </Container>
);
