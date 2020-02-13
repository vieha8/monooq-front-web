import React from 'react';
import ImageLogo from 'components/LV1/Images/ImageLogo';
import Path from 'config/path';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const LogoLink = styled.span`
  width: 138px;
  display: inline-flex;
  margin-left: ${Dimens.medium3_40}px;
  margin-right: ${Dimens.medium_20}px;
  ${media.tablet`
    width: 100px;
    margin-top: 0px;
    margin-left: ${Dimens.medium_17}px;
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
    <LogoLink to={Path.top()} as={Link}>
      <ImageLogo.HeaderFill />
    </LogoLink>
  );
};

export default Logo;
