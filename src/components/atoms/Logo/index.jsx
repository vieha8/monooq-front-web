// @flow

import React from 'react';
import styled from 'styled-components';
import logoImage from './logo.svg';
import logoWhiteImage from './logo-white.svg';

const Logo = styled.img`
  width: ${props => props.width}px;
  height: ${props => props.width / 2}px;
`;

export default {
  Base: () => <Logo src={logoImageUri} alt="logo" width={240} />,
  Header: () => <Logo src={logoImage} alt="logo" width={80} />,
  ColoredHeader: () => <Logo src={logoWhiteImage} alt="logo" width={80} />,
  Footer: () => <Logo src={logoImageUri} alt="logo" width={120} />,
};
