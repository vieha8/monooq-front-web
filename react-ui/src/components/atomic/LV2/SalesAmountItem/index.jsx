// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors, FontSizes } from 'variables';

const InputFieldWrapper = styled.div`
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid ${Colors.lightGray2};
  padding: 20px;
`;

const SalesTitleWrapper = styled.div`
  display: inline-block;
  float: left;
`;

const SalesAmountItemWrapper = styled.div`
  display: inline-block;
  float: right;
  font-size: ${FontSizes.medium1}px;
  font-weight: bold;
`;

type PropTypes = {
  amount: Number,
};

export default (props: PropTypes) => (
  <Fragment>
    <InputFieldWrapper>
      <SalesTitleWrapper>現在の売上金</SalesTitleWrapper>
      <SalesAmountItemWrapper>
        {String(props.amount).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}円
      </SalesAmountItemWrapper>
    </InputFieldWrapper>
  </Fragment>
);
