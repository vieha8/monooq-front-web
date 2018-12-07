// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const InputFieldWrapper = styled.div`
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid ${Colors.lightGray2};
  padding: ${Dimens.medium_20}px 15px;
  ${media.phone`
    padding: ${Dimens.medium_20}px 0px;
  `};
`;

const SalesTitleWrapper = styled.div`
  display: inline-block;
  float: left;
`;

const SalesAmountItemWrapper = styled.div`
  display: inline-block;
  float: right;
  font-size: ${FontSizes.medium_18}px;
  ${props =>
    props.bold &&
    `
    font-weight: bold;
  `};
  ${props =>
    props.colorPrimary &&
    `
    color: ${Colors.brandPrimary};
  `};
`;

type PropTypes = {
  title: String,
  amount: Number,
};

export default (props: PropTypes) => (
  <Fragment>
    <InputFieldWrapper>
      <SalesTitleWrapper>{props.title}</SalesTitleWrapper>
      <SalesAmountItemWrapper
        fontSize={props.fontSize}
        bold={props.bold}
        colorPrimary={props.colorPrimary}
      >
        {String(props.amount).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}円
      </SalesAmountItemWrapper>
    </InputFieldWrapper>
  </Fragment>
);
