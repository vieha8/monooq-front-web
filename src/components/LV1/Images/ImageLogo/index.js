import React from 'react';
// import styled from 'styled-components';
import Image from 'next/image'

const logoImage = '/images/img_service_logo.svg';
// const logoWhiteImage = 'https://monooq.imgix.net/img%2Fservice%2Flogo-white.svg?auto=compress';
// const MonoboyImage = 'https://monooq.imgix.net/img%2Fservice%2Fimg-monoboy-b.png?auto=compress';
const logoWhiteImage = 'images/img_service_logo-white.svg';
const MonoboyImage = 'images/img_service_img-monoboy-b.png';

// const Logo = styled.img`
//   width: ${props => props.width}px;
//   height: ${props => props.width / 4}px;
// `;

// const LogoFill = styled.img`
//   width: 100%;
//   height: auto;
// `;

export default {
  Base: ({ width }) => <Image objectFit='contain' src={logoImage} alt="logo" width={ width || 280} height={width/4 || 70} />,
  BaseWhite: ({ width }) => <Image objectFit='contain' src={logoWhiteImage} alt="logo" width={ width ||  280} height={width/4 || 70} />,
  Header: ({ width }) => <Image objectFit='contain' src={logoImage} alt="logo" width={ width ||  80} height={width/4 || 20} />,
  HeaderFill: () => <Image objectFit='contain' src={logoImage} alt="logo" width={'100%'} height={'auto'} />,
  Footer: ({ width }) => <Image objectFit='contain' src={logoImage} alt="logo" width={ width ||  120} height={width/4 || 30} />,
  HeaderWhite: ({ width }) => <Image objectFit='contain' src={logoWhiteImage} alt="logo" width={ width ||  80} />,
  HeaderWhiteFill: () => <Image objectFit='contain' src={logoWhiteImage} alt="logo" width={'100%'} height={'auto'}/>,
  MonoboyBlack: () => <Image objectFit='contain' src={MonoboyImage} alt="monoboy" width={'100%'} height={'auto'}/>,
};
