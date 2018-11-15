// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors, FontSizes } from 'variables';

const btnlink = styled(Link)``;

export const PrimaryButton = styled.div`
  width: 100%;
  ${props => !props.fill && `max-width: 300px;`}
  padding: 17px 10px;
  text-align: center;
  font-size: ${FontSizes.medium}px;
  font-weight: ${props => (props.fontbold ? 'bold' : 'normal')};
  color: ${Colors.white};
  background: ${Colors.brandPrimary};
  border-radius: 3px;
  cursor: pointer;

  &:focus {
    background: ${Colors.brandSecondary};
  }

  ${props =>
    props.height &&
    `
      height: ${props.height}px;
      padding: ${props.height / 2 - FontSizes.medium / 2}px 10px;
    `}

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
