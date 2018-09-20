// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors } from 'variables';

const TextLink = styled(Link)`
  color: ${Colors.linkBlue};
  line-height: 1.6;
  font-size: ${props => props.fontSize || 16}px;
  cursor: pointer;

  &:link {
    color: ${Colors.linkBlue};
  }
  &:visited {
    color: ${Colors.linkBlue};
  }
  &:hover {
    color: ${Colors.linkBlue};
    opacity: 0.8;
  }
  &:active {
    color: ${Colors.linkBlue};
  }

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
    <HyperLink {...props} href={props.href}>
      {props.children}
    </HyperLink>
  ) : (
    <TextLink {...props} to={props.to || ''}>
      {props.children}
    </TextLink>
  );
