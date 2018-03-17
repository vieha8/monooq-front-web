import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';

const Container = styled.div`
  display: table;
  width: 100%;
  margin-top: ${Dimens.medium}px;
  border-top: 1px solid ${Colors.borderGray};
  padding: ${Dimens.medium}px ${Dimens.xsmall}px;
`;

const LabelContainer = styled.div`
  display: table-cell;
  vertical-align: middle;
  font-size: ${FontSizes.small}px;
`;

const Label = styled.span`
  display: block;
  font-size: ${FontSizes.small}px;
  color: ${Colors.black};
`;

const Caption = Label.extend`
  color: ${Colors.lightGray1};
  font-size: ${FontSizes.xsmall}px;
  margin-top: ${Dimens.xsmall}px;
`;

const Sales = LabelContainer.extend`
  text-align: right;
  font-weight: bold;
  color: ${Colors.black};
`;

export default props => (
  <Container>
    <LabelContainer>
      <Label>売上</Label>
      <Caption>サービス利用手数料を引いた金額が表示されています。</Caption>
    </LabelContainer>
    <Sales>
      {props.salesAmount}円
    </Sales>
  </Container>
);
