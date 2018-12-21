// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const btnlink = styled(Link)``;

export const PrimaryButton = styled.div`
  box-sizing: border-box;
  width: ${props => (props.width ? props.width : '100%')};
  ${props => !props.fill && `max-width: 300px;`}
  padding: 17px 10px;
  text-align: center;
  font-size: ${props => props.fontSize || FontSizes.small_15}px;
  ${media.phone`
    font-size: ${props => props.fontSizeSp || FontSizes.small_15}px;
  `};
  font-weight: ${props => (props.fontbold ? 'bold' : 'normal')};
  color: ${Colors.white};
  background: ${Colors.brandPrimary};
  border-radius: 3px;
  cursor: pointer;

  &:focus {
    background: ${Colors.brandSecondary};
  }
  
  ${props => (props.lineheight ? `line-height: ${props.lineheight};` : `line-height: normal`)};

  height: 48px;
  padding: 13px 10px;
  ${props =>
    props.height &&
    `
      height: ${props.height}px;
      padding: ${props.padding}px;
    `};
    
  ${props =>
    props.inlineblock &&
    `
      display: inline-block;
    `};

  ${props =>
    props.center &&
    `
    margin: 0 auto;
  `} ${props =>
  props.disabled
    ? css`
        background: ${Colors.lightGray1};
        cursor: not-allowed;
      `
    : css`
        &:hover {
          background: ${Colors.brandTerciary};
        }
      `} ${props =>
  props.small &&
  css`
    padding: 8px 4px;
    font-size: 12px;
  `} ${props =>
  props.medium &&
  css`
    padding: 12px 8px;
    font-size: 16px;
  `} ${props =>
  props.fontSize &&
  css`
    font-size: ${props.fontSize}px;
  `};
`;

const HyperLink = btnlink.withComponent('a');

export default (props: Object) =>
  props.link ? (
    props.blank ? (
      <HyperLink {...props} href={props.href} target="_blank">
        <PrimaryButton {...props} />
      </HyperLink>
    ) : (
      <HyperLink {...props} href={props.href}>
        <PrimaryButton {...props} />
      </HyperLink>
    )
  ) : (
    <PrimaryButton {...props} />
  );
