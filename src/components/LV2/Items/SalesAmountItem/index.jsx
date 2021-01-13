import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { formatAddComma } from 'helpers/string';

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

export default ({ title, bold, amount, colorPrimary }) => (
  <InputFieldWrapper>
    <SalesTitleWrapper>{title}</SalesTitleWrapper>
    <SalesAmountItemWrapper bold={bold} colorPrimary={colorPrimary}>
      {formatAddComma(amount)}円
    </SalesAmountItemWrapper>
  </InputFieldWrapper>
);
