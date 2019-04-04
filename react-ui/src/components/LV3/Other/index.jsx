// @flow

import React, { Fragment } from 'react';
import Path from 'config/path';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Dimens, Colors, FontSizes } from 'variables';

const MenuLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  color: ${Colors.darkGray1};
  text-decoration: none;
  padding: 2px 0;
`;

const AsctContentWrapper = styled.div`
  margin-top: ${Dimens.medium_20}px;
`;

const ItemContainer = styled.div`
  width: 100%;
  margin: ${Dimens.medium_18}px auto;
  display: block;
  font-size: ${FontSizes.small_15}px;
`;

type PropTypes = {
  logout: Function,
  isLogin: boolean,
};

export default (props: PropTypes) => (
  <Fragment>
    <AsctContentWrapper>
      <MenuLink to={Path.terms()}>
        <ItemContainer>利用規約</ItemContainer>
      </MenuLink>
      <MenuLink to={Path.privacy()}>
        <ItemContainer>プライバシーポリシー</ItemContainer>
      </MenuLink>
      <MenuLink to={Path.asct()}>
        <ItemContainer>特定商取引に関する表記</ItemContainer>
      </MenuLink>
      <MenuLink to={Path.cancellationPolicies()}>
        <ItemContainer>キャンセルポリシー</ItemContainer>
      </MenuLink>
      {props.isLogin && (
        <MenuLink to="" onClick={props.logout.onClick}>
          <ItemContainer>ログアウト</ItemContainer>
        </MenuLink>
      )}
    </AsctContentWrapper>
  </Fragment>
);
