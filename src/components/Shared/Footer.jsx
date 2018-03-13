import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  width: 100%;
  border-top: 1px solid ${Colors.borderGray};
  &::after {
    clear: both;
    content: "";
    display: block;
  }
  ${media.phone`
    padding-top: ${Dimens.medium}px;
  `}
`;

const Menu = styled.a`
  display: block;
  font-size: ${FontSizes.small}px;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  color: ${Colors.linkBlue};
  padding: ${Dimens.medium2}px ${Dimens.small2}px;
  cursor: pointer;
  float: left;
  ${media.phone`
    float: none;
    font-size: ${FontSizes.xsmall}px;
    padding: ${Dimens.small}px ${Dimens.small}px;
    text-align: left;
    margin-left: ${Dimens.medium}px;
  `}
`;

const Copyright = styled.span`
  display: block;
  width: 20%;
  font-size: ${FontSizes.xsmall}px;
  text-align: right;
  vertical-align: middle;
  color: ${Colors.darkGray1};
  padding: ${Dimens.medium2}px ${Dimens.small}px;
  float: right;
  ${media.phone`
    float: none;
    margin-left: ${Dimens.medium}px;
  `}
`;

export default () => (
  <Container>
    <Menu href="/about">はじめての方へ</Menu>
    <Menu href="/">運営会社</Menu>
    <Menu href="/">お問い合わせ</Menu>
    <Menu href="/">プライバシーポリシー</Menu>
    <Menu href="/">利用規約</Menu>
    <Menu href="/">特定商取引法に基づく表記</Menu>
    <Menu href="/">キャンセルポリシー</Menu>
    <Menu href="/insurance">荷物に対する保険</Menu>
    <Menu href="/rule">ルールとマナー</Menu>
    <Copyright>©︎モノオク</Copyright>
  </Container>
);
