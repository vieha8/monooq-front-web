// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Link } from 'react-router-dom';
import { Colors, Dimens } from 'variables';
import { PrimaryButton } from './Primary';

const Twitter = styled(PrimaryButton)`
  ${props =>
    props.disabled &&
    `
      cursor: not-allowed;
      border-color: ${Colors.lightGray1};
      color: ${Colors.lightGray1};    
    `};

  background: ${Colors.white};
  color: ${Colors.twitter};
  border: 2px solid ${Colors.twitter};
  padding-left: ${Dimens.medium3}px;
  &:hover {
    background: ${Colors.white};
    border-color: ${Colors.twitterHover};
    color: ${Colors.twitterHover};
  }
  ${media.phone`
    padding-left: 38px;
  `};
`;

const btnlink = styled(Link)``;
const HyperLink = btnlink.withComponent('a');

export default (props: Object) => (
  <HyperLink href={props.url.toString('base64')} target="_blank">
    <Twitter {...props}>
      {!props.loading && (
        <span>
          <i className="fab fa-twitter-square fa-2x btn-icon-twitter" />
          &nbsp;
        </span>
      )}
      {props.children}
    </Twitter>
  </HyperLink>
);
