// @flow

import React from 'react';
import styled from 'styled-components';
import TextLink from 'components/LV1/TextLink';
import InlineText from 'components/LV1/InlineText';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';

const Container = styled.footer`
  width: 100%;
  background-color: ${Colors.white};
  border-top: 1px solid ${Colors.borderGray};
  padding: 0px ${Dimens.medium2}px;
  ${media.tablet`
    padding: 0;
  `};
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  height: ${Dimens.large_60}px;
  ${media.phone`
    height: auto;
    display: block;
  `};
`;

const Cell = styled.li`
  display: inline-flex;
  padding: 0 ${Dimens.small}px;
  &:last-child {
    margin-left: auto;
  }
  ${media.phone`
    display: block;
    padding: 6px 24px;
    &:last-child {
      margin-left: none;
    }
  `};
`;

const CellLink = styled(TextLink)`
  font-size: ${FontSizes.xsmall}px;
`;

export default () => (
  <Container>
    <nav>
      <List>
        <Cell>
          <CellLink href="https://monooq.co.jp/" target="_blank">
            運営会社
          </CellLink>
        </Cell>
        <Cell>
          <CellLink to={Path.about()}>はじめての方へ</CellLink>
        </Cell>
        <Cell>
          <CellLink to={Path.insurance()}>荷物に対する保険</CellLink>
        </Cell>
        <Cell>
          <CellLink to={Path.rule()}>ルールとマナー</CellLink>
        </Cell>
        <Cell>
          <CellLink href="https://help.monooq.com/" target="_blank">
            よくある質問
          </CellLink>
        </Cell>
        <Cell>
          <CellLink to={Path.terms()}>利用規約</CellLink>
        </Cell>
        <Cell>
          <CellLink to={Path.privacy()}>プライバシーポリシー</CellLink>
        </Cell>
        <Cell>
          <CellLink to={Path.asct()}>特定商取引法に基づく表記</CellLink>
        </Cell>
        <Cell>
          <CellLink to={Path.cancellationPolicies()}>キャンセルポリシー</CellLink>
        </Cell>
        <Cell>
          <InlineText.Base fontSize={11}>@ 2019 MonooQ</InlineText.Base>
        </Cell>
      </List>
    </nav>
  </Container>
);
