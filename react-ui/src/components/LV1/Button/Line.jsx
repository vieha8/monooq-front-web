// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors } from 'variables';
import LogoLineSrc from 'images/logo-line-w.png';
import ReactGA from 'react-ga';
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
      &:hover span img {
        opacity: 0.8;
      }
    `};
`;

const ImageLine = styled.img`
  width: 25px;
  position: absolute;
  margin-left: -20px;
`;

const btnlink = styled(Link)``;
const HyperLink = btnlink.withComponent('a');

export default (props: Object) => (
  <HyperLink href="https://line.me/R/ti/p/%40wna0649g" target="_blank">
    <Line
      center
      fill={1}
      fontSize={18}
      fontSizeSp={18}
      lineheight={22}
      onClick={() =>
        ReactGA.event({ category: props.reactGACategory, action: props.reactGAAction })
      }
    >
      {!props.loading && (
        <span>
          <ImageLine src={LogoLineSrc} alt="logo-line" />
          &nbsp;&nbsp;&nbsp;
        </span>
      )}
      {props.children}
    </Line>
  </HyperLink>
);
