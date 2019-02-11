// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import LogoLineSrc from 'images/logo-line-w.png';
import { PrimaryButton } from './Primary';

const Line = styled(PrimaryButton)`
  background: ${Colors.line};
  color: ${Colors.white};
  padding-left: 25px;
  ${props =>
    props.disabled
      ? `
      cursor: not-allowed;
      border-color: ${Colors.lightGray1};
      color: ${Colors.lightGray1};    
    `
      : `
      &:hover {
        background: ${Colors.lineHover};
      }
    `};
`;

const ImageLine = styled.img`
  width: 25px;
  position: absolute;
  margin-left: -20px;
`;

export default (props: Object) => (
  <Line {...props} fontSize={18} fontSizeSp={18} lineheight={22}>
    {!props.loading && (
      <span>
        <ImageLine src={LogoLineSrc} alt="logo-line" />
        &nbsp;&nbsp;&nbsp;
      </span>
    )}
    {props.children}
  </Line>
);
