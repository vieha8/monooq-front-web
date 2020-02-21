import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Wrap = styled.div`
  width: 100%;
  min-height: 20px;
  margin: ${Dimens.medium_20}px auto 0;
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

const HostImageWrap = styled.span``;

const HostNameWrap = styled.span`
  vertical-align: middle;
  display: inline-block;
  width: calc(100% - 60px);
  margin-left: ${Dimens.small2_15}px;
  color: ${Colors.brandPrimary};
  font-weight: bold;
  line-height: normal;
  ${media.phone`
    font-size: ${FontSizes.small_12}px;
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
    <HostNameWrap message={message}>{contentHostName}</HostNameWrap>
    {!isNoProfile && <ProfileWrap>{contentProfile}</ProfileWrap>}
  </Wrap>
);
