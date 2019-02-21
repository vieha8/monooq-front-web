// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Link } from 'react-router-dom';
import { Colors, Dimens } from 'variables';
import imageFacebook from 'images/icon-facebook.svg';
import { PrimaryButton } from './Primary';

const Facebook = styled(PrimaryButton)`
  background: ${Colors.facebook};
  color: ${Colors.white};

  ${props =>
    props.disabled
      ? `
      cursor: not-allowed;
      border-color: ${Colors.lightGray1};
      color: ${Colors.lightGray1};    
    `
      : `
      &:hover {
        background: ${Colors.facebookHover};
      }
    `};
  ${props =>
    props.type2 &&
    `
      padding: ${Dimens.small_11}px ${Dimens.small_10}px;
      background: ${Colors.white};
      color: ${Colors.facebook_type2};
      border: 2px solid ${Colors.facebook_type2};
      padding-left: ${Dimens.medium}px;
      &:hover {
        background: ${Colors.white};
        color: ${Colors.facebookHover_type2};
        border-color: ${Colors.facebookHover_type2};
      }
      &:hover span img {
        opacity: 0.7;
      }
    `};
  ${media.phone`
    ${props =>
      props.type2 &&
      css`
        padding: ${Dimens.small_10}px;
        padding-left: ${Dimens.small_10}px;
        padding-right: ${Dimens.xxsmall}px;
      `}
  `};
`;

const btnlink = styled(Link)``;
const HyperLink = btnlink.withComponent('a');

const ImageWrap = styled.span`
  display: inline-block;
  position: relative;
  padding-left: ${Dimens.medium_22}px;
`;

const Image = styled.img`
  width: ${Dimens.medium1}px;
  position: absolute;
  top: -1px;
  left: -6px;
`;

export default (props: Object) =>
  props.type2 ? (
    <HyperLink href={props.url.toString('base64')} target="_blank">
      <Facebook {...props}>
        {!props.loading && (
          <ImageWrap>
            <Image src={imageFacebook} alt="icon-facebook" />
            &nbsp;
          </ImageWrap>
        )}
        {props.children}
      </Facebook>
    </HyperLink>
  ) : (
    <Facebook {...props}>
      {!props.loading && (
        <span>
          <i className="fab fa-facebook-square" />
          &nbsp;
        </span>
      )}
      {props.children}
    </Facebook>
  );
