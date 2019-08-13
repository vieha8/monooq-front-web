// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';
import { Colors, Dimens } from 'variables';
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

const FooterLink = (props: Object) => (
  <TextLink {...props} fontSize={11}>
    {props.children}
  </TextLink>
);

export default () => (
  <Container>
    <nav>
      <List>
        <Cell>
          <FooterLink href="https://monooq.co.jp/" target="_blank">
            運営会社
          </FooterLink>
        </Cell>
        <Cell>
          <FooterLink to={Path.about()}>はじめての方へ</FooterLink>
        </Cell>
        <Cell>
          <FooterLink to={Path.insurance()}>荷物に対する保険</FooterLink>
        </Cell>
        <Cell>
          <FooterLink to={Path.rule()}>ルールとマナー</FooterLink>
        </Cell>
        <Cell>
          <FooterLink href="https://help.monooq.com/" target="_blank">
            よくある質問
          </FooterLink>
        </Cell>
        <Cell>
          <FooterLink to={Path.terms()}>利用規約</FooterLink>
        </Cell>
        <Cell>
          <FooterLink to={Path.privacy()}>プライバシーポリシー</FooterLink>
        </Cell>
        <Cell>
          <FooterLink to={Path.asct()}>特定商取引法に基づく表記</FooterLink>
        </Cell>
        <Cell>
          <FooterLink to={Path.cancelPolicy()}>キャンセルポリシー</FooterLink>
        </Cell>
        <Cell>
          <InlineText.Base fontSize={11}>@ 2019 MonooQ</InlineText.Base>
        </Cell>
      </List>
    </nav>
  </Container>
);
