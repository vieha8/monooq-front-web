// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import { Colors } from 'variables';

export const Primary = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 17px 10px;
  text-align: center;
  font-size: 16px;
  color: ${Colors.white};
  background: ${Colors.brandPrimary};
  border-radius: 6px;
  cursor: pointer;

  &:focus {
    background: ${Colors.brandSecondary};
  }

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

export default (props: Object) => (
  <Primary {...props} />
);
