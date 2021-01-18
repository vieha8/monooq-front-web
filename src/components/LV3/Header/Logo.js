import React from 'react';
import ImageLogo from 'components/LV1/Images/ImageLogo';
import Path from 'config/path';
import Link from 'next/link';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const LogoLink = styled.span`
  width: 138px;
  display: inline-flex;
  margin-left: ${Dimens.medium3_40}px;
  margin-right: ${Dimens.medium_20}px;
  ${media.desktop`
    width: 118px;
    margin-left: ${Dimens.medium}px;
  `};
  ${media.tablet`
    width: 100px;
    margin-top: 0px;
  `};
`;

const Logo = ({ noLink }) => {
  if (noLink) {
    return (
      <LogoLink>
        <ImageLogo.HeaderFill />
      </LogoLink>
    );
  }
  return (
    <Link href={Path.top()}>
      <LogoLink as="a">
        <ImageLogo.HeaderFill />
      </LogoLink>
    </Link>
  );
};

export default Logo;
