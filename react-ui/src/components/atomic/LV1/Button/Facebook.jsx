// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Link } from 'react-router-dom';
import { Colors, Dimens } from 'variables';
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
      background: ${Colors.white};
      color: ${Colors.facebook};
      border: 2px solid ${Colors.facebook};
      padding-left: ${Dimens.medium3}px;
      &:hover {
        background: ${Colors.white};
        border-color: ${Colors.facebookHover};
        color: ${Colors.facebookHover};
      }
    `};
  ${media.phone`
    ${props =>
      props.type2 &&
      css`
        padding-left: 38px;
      `}
  `};
`;

const btnlink = styled(Link)``;
const HyperLink = btnlink.withComponent('a');

export default (props: Object) =>
  props.type2 ? (
    <HyperLink href={props.url.toString('base64')} target="_blank">
      <Facebook {...props}>
        {!props.loading && (
          <span>
            <i className="fab fa-facebook-square fa-2x btn-icon-facebook" />
            &nbsp;
          </span>
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
