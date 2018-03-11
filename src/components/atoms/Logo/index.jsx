// @flow

import React from 'react';
import styled from 'styled-components';
import logoImageUri from './monooq_logo.svg';

const Logo = styled.img`
  width: ${props => props.width}px;
  height: ${props => props.width / 2}px;
`;

export default {
  Base: () => <Logo src={logoImageUri} alt="logo" width={240} />,
  Footer: () => <Logo src={logoImageUri} alt="logo" width={120} />,
};
