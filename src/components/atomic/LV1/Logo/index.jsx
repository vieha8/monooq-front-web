// @flow

import React from 'react';
import styled from 'styled-components';
import logoImage from './logo.svg';
import logoWhiteImage from './logo-white.svg';
import logoHubImage from './logo-hub.svg';

const Logo = styled.img`
  width: ${props => props.width}px;
  height: ${props => props.width / 4}px;
`;

export default {
  Base: ({ width }) => <Logo src={logoImage} alt="logo" width={width || 280} />,
  Header: () => <Logo src={logoImage} alt="logo" width={80} />,
  Footer: () => <Logo src={logoImage} alt="logo" width={120} />,
  HeaderWhite: () => <Logo src={logoWhiteImage} alt="logo" width={80} />,
  Hub: ({ width }) => <Logo src={logoHubImage} alt="logo" width={width || 80} />,
};
