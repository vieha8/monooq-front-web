// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';

const ContentContainer = styled.div`
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
  ${media.phone`
    padding: ${Dimens.medium}px;
    box-sizing: border-box;
  `};
`;
const Header = styled.div`
  width: 178.22px;
  font-weight: bold;
  margin-right: ${Dimens.medium_20}px;
  display: table-cell;
  ${media.phone`
    width: 100%;
    display: block;
    line-height: 2;
  `};
`;
const Data = styled.div`
  display: table-cell;
  ${media.phone`
    display: block;
    line-height: 2;
  `};
`;
export type PropTypes = {
  cancelContentList: Array<{
    header: string,
    data: string,
  }>,
};

export default ({ cancelContentList }: PropTypes) => (
  <Fragment>
    {cancelContentList.map((item, i) => (
      <ContentContainer key={i.toString()}>
        <Header>{item.header}</Header>
        <Data>{item.data}</Data>
      </ContentContainer>
    ))}
  </Fragment>
);
