// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import SerchIcon from 'images/icon-search.svg';

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
    <Image src={SerchIcon} alt="icon-serch" />
  </StyledLink>
);
