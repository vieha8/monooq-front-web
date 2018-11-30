// @flow

import React, { Fragment } from 'react';
import Path from 'config/path';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from 'variables';

const MenuLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  color: ${Colors.darkGray1};
  text-decoration: none;
  padding: 2px 0;
`;

const AsctContentWrapper = styled.div`
  margin-bottom: 40px;
`;

const ItemContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  display: block;
  font-size: 16px;
`;

const HyperLink = MenuLink.withComponent('a');

export default () => (
  <Fragment>
    <AsctContentWrapper>
      <MenuLink to={Path.about()}>
        <ItemContainer>初めてのモノオク</ItemContainer>
      </MenuLink>
      <MenuLink to={Path.insurance()}>
        <ItemContainer>荷物に対する保険</ItemContainer>
      </MenuLink>
      <MenuLink to={Path.rule()}>
        <ItemContainer>ルールとマナー</ItemContainer>
      </MenuLink>
      <HyperLink href="https://help.monooq.com/" target="_blank">
        <ItemContainer>ヘルプ</ItemContainer>
      </HyperLink>
    </AsctContentWrapper>
  </Fragment>
);
