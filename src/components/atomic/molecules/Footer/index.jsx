// @flow

import React from 'react';
import styled from 'styled-components';
import TextLink from 'components/atomic/atoms/TextLink';
import InlineText from 'components/atomic/atoms/InlineText';
import { Colors } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.footer`
  width: 100%;
  border-top: 1px solid ${Colors.borderGray};
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
  padding: 0 12px;
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

const Link = TextLink.extend`
  font-size: 12px;
`;

type PropTypes = {
  beginnerUri: string,
  companyUri: string,
  inquiryUri: string,
  privacyPolicyUri: string,
  termsUri: string,
  legalUri: string,
  cancelPolicyUri: string,
}

export default (props: PropTypes) => (
  <Container>
    <nav>
      <List>
        <Cell>
          <Link href={props.beginnerUri}>はじめての方へ</Link>
        </Cell>
        <Cell>
          <Link href={props.companyUri}>運営会社</Link>
        </Cell>
        <Cell>
          <Link href={props.inquiryUri}>お問い合わせ</Link>
        </Cell>
        <Cell>
          <Link href={props.privacyPolicyUri}>プライバシーポリシー</Link>
        </Cell>
        <Cell>
          <Link href={props.termsUri}>利用規約</Link>
        </Cell>
        <Cell>
          <Link href={props.legalUri}>特定商取引に基づく表記</Link>
        </Cell>
        <Cell>
          <Link href={props.cancelPolicyUri}>キャンセルポリシー</Link>
        </Cell>
        <Cell>
          <InlineText.Small color={Colors.lightGray1}>@ 2018 Monooq</InlineText.Small>
        </Cell>
      </List>
    </nav>
  </Container>
);
