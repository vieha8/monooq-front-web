// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import SearchIcon from 'images/icon-search.png';

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: ${Dimens.xsmall}px;
  ${media.tablet`
    margin-top: 0px;
  `};
`;

const Image = styled.img`
  display: inline-block;
  width: ${Dimens.medium2_34}px;
  height: auto;
`;

type PropTypes = {
  href?: string,
  onClick?: Function,
};

export default ({ href, onClick }: PropTypes) => (
  <StyledLink to={href} onClick={onClick}>
    <Image src={SearchIcon} alt="icon-search" />
  </StyledLink>
);
