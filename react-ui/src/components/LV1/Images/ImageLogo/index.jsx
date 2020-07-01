import React from 'react';
import styled from 'styled-components';

const logoImage = 'https://monooq.imgix.net/img%2Fservice%2Flogo.svg?auto=compress';
const logoWhiteImage = 'https://monooq.imgix.net/img%2Fservice%2Flogo-white.svg?auto=compress';
const MonoboyImage = 'https://monooq.imgix.net/img%2Fservice%2Fimg-monoboy-b.png?auto=compress';

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
  MonoboyBlack: () => <LogoFill src={MonoboyImage} alt="monoboy" />,
};
