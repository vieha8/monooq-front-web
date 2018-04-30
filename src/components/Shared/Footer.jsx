import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';

const Container = styled.div`
  width: 100%;
  display: table;
  border-top: 1px solid ${Colors.borderGray};
  &::after {
    clear: both;
    content: '';
    display: block;
  }
  padding: ${Dimens.medium}px ${Dimens.medium2}px;
  ${media.tablet`
    padding: ${Dimens.medium}px 0;
  `};
`;

const Menu = styled(Link)`
  display: inline-block;
  font-size: ${FontSizes.xsmall}px;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  color: ${Colors.linkBlue};
  padding: ${Dimens.small}px;
  cursor: pointer;
  ${media.tablet`
    display: block;
    font-size: ${FontSizes.xsmall}px;
    padding: ${Dimens.small}px ${Dimens.small}px;
    text-align: left;
    margin-left: ${Dimens.medium}px;
  `};
`;

const Copyright = styled.span`
  display: table-cell;
  font-size: ${FontSizes.xsmall}px;
  text-align: right;
  vertical-align: middle;
  color: ${Colors.darkGray1};
  padding: 0 ${Dimens.small}px;
  margin-left: auto;
  ${media.tablet`
    display: block;
    font-size: ${FontSizes.xsmall}px;
    margin-left: ${Dimens.medium}px;
    padding: ${Dimens.small}px ${Dimens.small}px;
    text-align: left;
  `};
`;

export default () => (
  <Container>
    <Menu to={Path.company()}>運営会社</Menu>
    <Menu to={Path.about()}>はじめての方へ</Menu>
    <Menu to={Path.insurance()}>荷物に対する保険</Menu>
    <Menu to={Path.rule()}>ルールとマナー</Menu>
    <Menu to={Path.helpTop()}>ヘルプ</Menu>
    <Menu to={Path.terms()}>利用規約</Menu>
    <Menu to={Path.privacy()}>プライバシーポリシー</Menu>
    <Menu to={Path.asct()}>特定商取引法に基づく表記</Menu>
    {/*<Menu to={Path.cancellationPolicies()}>キャンセルポリシー</Menu>*/}
    <Copyright>@ 2018 MonooQ</Copyright>
  </Container>
);
