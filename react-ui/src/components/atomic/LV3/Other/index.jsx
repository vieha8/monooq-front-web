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
      <HyperLink href={Path.terms()}>
        <ItemContainer>利用規約</ItemContainer>
      </HyperLink>
      <HyperLink href={Path.privacy()}>
        <ItemContainer>プライバシーポリシー</ItemContainer>
      </HyperLink>
      <HyperLink href={Path.asct()}>
        <ItemContainer>特定商取引に関する表記</ItemContainer>
      </HyperLink>
      <HyperLink href={Path.cancellationPolicies()}>
        <ItemContainer>キャンセルポリシー</ItemContainer>
      </HyperLink>
    </AsctContentWrapper>
  </Fragment>
);
