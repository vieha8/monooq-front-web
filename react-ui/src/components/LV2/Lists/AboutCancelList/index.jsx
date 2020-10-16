import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';

const Wrap = styled.div``;

const ContentWrap = styled.div`
  width: 100%;
  display: table;
  font-size: ${FontSizes.small}px;
  padding: ${Dimens.medium_20}px;
  border-right: 1px solid ${Colors.borderGray};
  border-left: 1px solid ${Colors.borderGray};
  border-bottom: 1px solid ${Colors.borderGray};
  box-sizing: border-box;
  :nth-child(odd) {
    background-color: ${Colors.lightGray1Bg};
  }
  :first-child {
    border-top: 1px solid ${Colors.borderGray};
  }
  ${props =>
    props.title &&
    `
      padding: ${Dimens.medium2}px ${Dimens.small2_15}px ${Dimens.small_10}px 0;
      border: none;
      border-top: none !important;
      border-bottom: 1px solid #DBDBDB;
      background-color: #fff !important;
      font-size: ${FontSizes.medium1_22}px;;
      font-weight: bold;
    `};
  ${media.phone`
    padding: ${Dimens.medium}px;
    box-sizing: border-box;
    ${props =>
      props.title &&
      `
        font-size: 5vw;
        padding: ${Dimens.medium2}px 0 ${Dimens.xxsmall_5}px;
      `};
  `};
`;

const Header = styled.div`
  width: 35%;
  font-weight: bold;
  margin-right: ${Dimens.medium_20}px;
  display: table-cell;
  ${media.tablet`
    width: 300px;
  `};
  ${media.phone`
    width: 100%;
    display: block;
    line-height: 2;
    ${props =>
      props.title &&
      `
        line-height: 1;
      `};
  `};
`;

const Data = styled.div`
  display: table-cell;
  padding-left: ${Dimens.xxsmall_5}px;
  ${props =>
    props.title &&
    `
      padding-left: ${Dimens.small2_15}px;
    `};
  ${media.phone`
    display: block;
    line-height: 2;
    padding-left: 0;
    ${props =>
      props.title &&
      `
        padding-left: 0;
      `};
  `};
`;

export default ({ cancelContentList }) => (
  <Wrap>
    {cancelContentList.map((item, i) => (
      <ContentWrap key={i.toString()} title={item.title}>
        <Header title={item.title}>{item.header}</Header>
        <Data title={item.title}>{item.data}</Data>
      </ContentWrap>
    ))}
  </Wrap>
);
