// @flow

import React from 'react';
import styled from 'styled-components';
import TextLink from 'components/atomic/atoms/TextLink';
import InlineText from 'components/atomic/atoms/InlineText';
import { Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';

const Container = styled.footer`
  width: 100%;
  border-top: 1px solid ${Colors.borderGray};
  padding: 0px 30px;
  ${media.tablet`
    padding: 0;
  `}
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  height: 60px;
  ${media.phone`
    height: auto;
    display: block;
  `}
`;

const Cell = styled.li`
  display: inline-flex;
  padding: 0 8px;
  &:last-child {
    margin-left: auto;
  }
  ${media.phone`
    display: block;
    padding: 6px 24px;
    &:last-child {
      margin-left: none;
    }
  `}
`;

const FooterLink = (props: Object) => (
  <TextLink {...props} fontSize={11}>{props.children}</TextLink>
);

export default () => (
  <Container>
    <nav>
      <List>
        <Cell>
          <FooterLink to={Path.company()}>運営会社</FooterLink>
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
          <FooterLink to={Path.helpTop()}>ヘルプ</FooterLink>
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
          <FooterLink to={Path.cancellationPolicies()}>キャンセルポリシー</FooterLink>
        </Cell>
        <Cell>
          <InlineText.Small color={Colors.lightGray1}>@ 2018 Monooq</InlineText.Small>
        </Cell>
      </List>
    </nav>
  </Container>
);
