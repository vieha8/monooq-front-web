import React from 'react';
import { Link } from 'next/link';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

const SearchIcon = 'https://monooq.imgix.net/img%2Fservice%2Ficon-search.png?auto=compress';

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

export default ({ href, onClick }) => (
  <StyledLink to={href || ''} onClick={onClick}>
    <Image src={SearchIcon} alt="icon-search" />
  </StyledLink>
);
