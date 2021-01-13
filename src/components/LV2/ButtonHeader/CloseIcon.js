import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

const CloseIcon = 'https://monooq.imgix.net/img%2Fservice%2Ficon-close-black.svg?auto=compress';

const Wrap = styled.div`
  display: inline-block;
  margin-top: ${Dimens.xsmall}px;
  ${media.tablet`
    margin-top: 0px;
  `};
`;

const Image = styled.img`
  display: inline-block;
  width: ${Dimens.medium_20}px;
  height: auto;
`;

export default ({ onClick }) => (
  <Wrap onClick={onClick}>
    <Image src={CloseIcon} alt="icon-close" />
  </Wrap>
);
