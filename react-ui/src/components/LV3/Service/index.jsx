// @flow

import React, { Fragment } from 'react';
import Path from 'config/path';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Dimens, Colors, FontSizes } from 'variables';

const Wrapper = styled.div`
  margin-top: ${Dimens.medium_20}px;
`;

const MenuLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  color: ${Colors.darkGray1};
  text-decoration: none;
  padding: 2px 0;
`;

const ItemContainer = styled.div`
  width: 100%;
  margin: ${Dimens.medium_18}px auto;
  display: block;
  font-size: ${FontSizes.small_15}px;
`;

const HyperLink = MenuLink.withComponent('a');

export default () => (
  <Fragment>
    <Wrapper>
      <HyperLink href="https://monooq.co.jp/" target="_blank" rel="noopener noreferrer">
        <ItemContainer>運営会社</ItemContainer>
      </HyperLink>
      <MenuLink to={Path.terms()}>
        <ItemContainer>利用規約</ItemContainer>
      </MenuLink>
      <MenuLink to={Path.privacy()}>
        <ItemContainer>プライバシーポリシー</ItemContainer>
      </MenuLink>
      <MenuLink to={Path.asct()}>
        <ItemContainer>特定商取引法に基づく表記</ItemContainer>
      </MenuLink>
      <MenuLink to={Path.cancellationPolicies()}>
        <ItemContainer>キャンセルポリシー</ItemContainer>
      </MenuLink>
    </Wrapper>
  </Fragment>
);
