// @flow

import React from 'react';
import styled from 'styled-components';
import logoImage from './logo.svg';
import logoWhiteImage from './logo-white.svg';

const Logo = styled.img`
  width: ${props => props.width}px;
  height: ${props => props.width / 4}px;
`;

const LogoFill = styled.img`
  width: 100%;
  height: auto;
`;

export default {
  Base: ({ width }) => <Logo src={logoImage} alt="logo" width={width || 280} />,
  BaseWhite: ({ width }) => <Logo src={logoWhiteImage} alt="logo" width={width || 280} />,
  Header: ({ width }) => <Logo src={logoImage} alt="logo" width={width || 80} />,
  HeaderFill: () => <LogoFill src={logoImage} alt="logo" />,
  Footer: ({ width }) => <Logo src={logoImage} alt="logo" width={width || 120} />,
  HeaderWhite: ({ width }) => <Logo src={logoWhiteImage} alt="logo" width={width || 80} />,
  HeaderWhiteFill: () => <LogoFill src={logoWhiteImage} alt="logo" />,
};
