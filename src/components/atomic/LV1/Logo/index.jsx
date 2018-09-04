// @flow

import React from 'react';
import styled from 'styled-components';
import logoImage from './logo.svg';
import logoWhiteImage from './logo-white.svg';
import logoHubImage from './logo-hub.svg';
import logoHubWhiteImage from './logo-hub-white.png';

const Logo = styled.img`
  width: ${props => props.width}px;
  height: ${props => props.width / 4}px;
`;

const LogoHightAuto = styled.img`
  width: ${props => props.width}px;
  height: auto;
`;

export default {
  Base: () => <Logo src={logoImage} alt="logo" width={280} />,
  Header: () => <Logo src={logoImage} alt="logo" width={80} />,
  Footer: () => <Logo src={logoImage} alt="logo" width={120} />,
  BaseWhite: () => <Logo src={logoWhiteImage} alt="logo" width={280} />,
  HeaderWhite: () => <Logo src={logoWhiteImage} alt="logo" width={80} />,
  Hub: () => <Logo src={logoHubImage} alt="logo" width={80} />,
  HubWhite: () => <LogoHightAuto src={logoHubWhiteImage} alt="logo" width={263} />,
};
