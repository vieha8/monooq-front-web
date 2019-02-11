// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const TextLink = styled(Link)`
  color: ${Colors.linkBlue};
  line-height: normal;
  font-size: ${props => props.fontSize || FontSizes.small_15}px;
  ${media.phone`
      font-size: ${props => props.fontSizeSp || FontSizes.small_12}px;
  `};

  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  ${props =>
    props.underline &&
    `
    text-decoration: underline;
  `};
  cursor: pointer;

  ${props =>
    props.color
      ? `&:link {
        color: ${props.color};
      }
      &:visited {
        color: ${props.color};
      }
      &:hover {
        color: ${props.color};
        opacity: 0.8;
      }
      &:active {
        color: ${props.color};
      }`
      : `&:link {
        color: ${props.linkBlue};
      }
      &:visited {
        color: ${props.linkBlue};
      }
      &:hover {
        color: ${props.linkBlue};
        opacity: 0.8;
      }
      &:active {
        color: ${props.linkBlue};
      }`};

  ${props => props.custom} ${props =>
    props.disabled &&
    `
    cursor: not-allowed;
    color: ${Colors.lightGray1};
    &:link { color: ${Colors.lightGray1}; }
    &:visited { color: ${Colors.lightGray1}; }
    &:hover { color: ${Colors.lightGray1}; opacity: 1; }
    &:active { color: ${Colors.lightGray1}; }
  `};

  ${props =>
    props.error &&
    `
    color: ${Colors.error};
    &:link { color: ${Colors.error}; }
    &:visited { color: ${Colors.error}; }
    &:hover { color: ${Colors.error}; opacity: 0.8; }
    &:active { color: ${Colors.error}; }
  `};
`;

const HyperLink = TextLink.withComponent('a');

export default (props: Object) =>
  props.href ? (
    props.key ? (
      <HyperLink {...props} href={props.href} key={props.key}>
        {props.children}
      </HyperLink>
    ) : (
      <HyperLink {...props} href={props.href}>
        {props.children}
      </HyperLink>
    )
  ) : (
    <TextLink {...props} to={props.to || ''}>
      {props.children}
    </TextLink>
  );
