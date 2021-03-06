import React from 'react';
import styled from 'styled-components';
import { mediaMin } from 'helpers/style/media-query';
import { Colors } from 'variables';
import ReactGA from 'react-ga';
import { PrimaryButton } from './Primary';

const LogoLineSrc = 'https://monooq.imgix.net/img%2Fservice%2Flogo-line-w.png?auto=compress';

const HyperLink = styled.a``;

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
      &:active {
        background: ${Colors.lineHover};
      }
      &:active span img {
        opacity: 0.8;
      }
    `};

  ${mediaMin.tablet`
    ${props =>
      !props.disabled &&
      `
        &:hover {
          background: ${Colors.lineHover};
        }
        &:hover span img {
          opacity: 0.8;
        }
      `};
  `};
`;

const SpanStyled = styled.span`
  position: relative;
`;

const ImageLine = styled.img`
  width: 23px;
  position: absolute;
  margin-left: -20px;
  bottom: 1px;
`;

export default ({ loading, reactGACategory, reactGAAction, children }) => (
  <HyperLink href="https://line.me/R/ti/p/%40wna0649g" target="_blank" rel="noopener noreferrer">
    <Line
      center
      fill={1}
      fontSize={18}
      fontSizeSp={18}
      height={44}
      lineheight={18}
      onClick={() => ReactGA.event({ category: reactGACategory, action: reactGAAction })}
    >
      {!loading && (
        <SpanStyled>
          <ImageLine src={LogoLineSrc} alt="logo-line" />
          &nbsp;&nbsp;&nbsp;
        </SpanStyled>
      )}
      {children}
    </Line>
  </HyperLink>
);
