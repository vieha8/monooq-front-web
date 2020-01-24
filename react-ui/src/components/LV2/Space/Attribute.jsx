import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Wrap = styled.div`
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

const HostImageWrap = styled.span`
  float: left;
`;

const HostNameWrap = styled.div`
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
  ${props =>
    props.message &&
    `
      margin-top: 0;
      line-height: normal;
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
    ${props =>
      props.message &&
      `
        margin-top: 0;
      `};
  `};
`;

const ProfileWrap = styled.div`
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
  <Wrap infoHost={infoHost} message={message} isNoProfile={isNoProfile}>
    <HostImageWrap>{headContent || <InlineText.Base>{title}</InlineText.Base>}</HostImageWrap>
    <HostNameWrap message={message} isNoProfile={isNoProfile}>
      {contentHostName}
    </HostNameWrap>
    {!isNoProfile && <ProfileWrap>{contentProfile}</ProfileWrap>}
  </Wrap>
);
