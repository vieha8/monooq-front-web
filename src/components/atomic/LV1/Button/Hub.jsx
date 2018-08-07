// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import { Colors, FontSizes } from 'variables';

export const HubButton = styled.div`
  width: 100%;
  ${props => !props.fill && `max-width: 300px;`}
  padding: 17px 10px;
  text-align: center;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.white};
  background: ${Colors.hub};
  border-radius: 6px;
  cursor: pointer;

  &:focus {
    background: ${Colors.facebook};
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
          background: ${Colors.facebook};
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

export default (props: Object) => <HubButton {...props} />;
