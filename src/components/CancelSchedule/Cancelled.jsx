import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  border-top: 1px solid ${Colors.borderGray};
  padding-top: ${Dimens.medium2}px;
  font-size: ${FontSizes.medium}px;
  color: black;
  ${media.tablet`
    padding: ${Dimens.medium2}px ${Dimens.medium}px 0;
  `}
`;

const ToTopLink = styled.a`
  display: block;
  font-size: ${FontSizes.small}px;
  color: ${Colors.linkBlue};
  margin-top: ${Dimens.medium}px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: ${Colors.linkBlue};    
  }
`;

export default () => (
  <Container>
    この予定をキャンセルしました
    <ToTopLink href="/">トップページから他の場所を探す</ToTopLink>
  </Container>
);
