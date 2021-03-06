import React from 'react';
import styled from 'styled-components';
import { media, mediaMin } from 'helpers/style/media-query';
import { Colors, Dimens } from 'variables';
import { PrimaryButton } from './Primary';

const imageTwitter = 'https://monooq.imgix.net/img%2Fservice%2Ficon-twitter.svg?auto=compress';

const Twitter = styled(PrimaryButton)`
  padding: ${Dimens.small_11}px ${Dimens.small_10}px;
  ${props =>
    props.disabled
      ? `
        cursor: not-allowed;
        border-color: ${Colors.lightGray1};
        color: ${Colors.lightGray1};
      `
      : `
        &:active {
          background: ${Colors.white};
          border-color: ${Colors.twitterHover};
          color: ${Colors.twitterHover};
        }
        &:active span img {
          opacity: 0.5;
        }
      `};

  background: ${Colors.white};
  color: ${Colors.twitter};
  border: 2px solid ${Colors.twitter};
  padding-left: 11px;

  ${mediaMin.tablet`
    ${props =>
      !props.disabled &&
      `
        &:hover {
          background: ${Colors.white};
          border-color: ${Colors.twitterHover};
          color: ${Colors.twitterHover};
        }
        &:hover span img {
          opacity: 0.5;
        }
      `};
  `};

  ${media.phone`
    padding: ${Dimens.small_10}px;
    padding-left: ${Dimens.xsmall}px;
    padding-right: ${Dimens.xsmall}px;
  `};
`;

const HyperLink = styled.a``;

const ImageWrap = styled.span`
  display: inline-block;
  position: relative;
  padding-left: ${Dimens.medium1_26}px;
`;

const Image = styled.img`
  width: ${Dimens.medium1}px;
  position: absolute;
  top: -1px;
  left: 0px;
`;

export default ({ loading, ...props }) => (
  <HyperLink href={props.url.toString('base64')} target="_blank">
    <Twitter {...props}>
      {!loading && (
        <ImageWrap>
          <Image src={imageTwitter} alt="icon-twitter" />
          &nbsp;
        </ImageWrap>
      )}
      {props.children}
    </Twitter>
  </HyperLink>
);
