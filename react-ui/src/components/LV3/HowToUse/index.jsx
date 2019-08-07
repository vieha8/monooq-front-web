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
      <MenuLink to={Path.about()}>
        <ItemContainer>初めてのモノオク</ItemContainer>
      </MenuLink>
      <MenuLink to={Path.insurance()}>
        <ItemContainer>荷物に対する保険</ItemContainer>
      </MenuLink>
      <MenuLink to={Path.rule()}>
        <ItemContainer>ルールとマナー</ItemContainer>
      </MenuLink>
      <HyperLink href="https://help.monooq.com/" target="_blank" rel="noopener noreferrer">
        <ItemContainer>よくある質問</ItemContainer>
      </HyperLink>
    </Wrapper>
  </Fragment>
);
