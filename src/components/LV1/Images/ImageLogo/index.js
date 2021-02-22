import React from 'react';
import styled from 'styled-components';
import Image from 'next/image'

const logoImage = '/images/logo-test.png';
// const logoWhiteImage = 'https://monooq.imgix.net/img%2Fservice%2Flogo-white.svg?auto=compress';
// const MonoboyImage = 'https://monooq.imgix.net/img%2Fservice%2Fimg-monoboy-b.png?auto=compress';
const logoWhiteImage = 'images/logo-test.png';
const MonoboyImage = 'images/logo-test.png';

const Logo = styled.img`
  width: ${props => props.width}px;
  height: ${props => props.width / 4}px;
`;

const LogoFill = styled.img`
  width: 100%;
  height: auto;
`;

export default {
  Base: ({ width }) => <Image src={logoImage} alt="logo" width={ width || 280} />,
  BaseWhite: ({ width }) => <Image src={logoWhiteImage} alt="logo" width={ width ||  280} />,
  Header: ({ width }) => <Image src={logoImage} alt="logo" width={ width ||  80} />,
  HeaderFill: () => <Image src={logoImage} alt="logo" />,
  Footer: ({ width }) => <Image src={logoImage} alt="logo" width={ width ||  120} />,
  HeaderWhite: ({ width }) => <Image src={logoWhiteImage} alt="logo" width={ width ||  80} />,
  HeaderWhiteFill: () => <Image src={logoWhiteImage} alt="logo" />,
  MonoboyBlack: () => <Image src={MonoboyImage} alt="monoboy" />,
};
