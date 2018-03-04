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

const Sales = LabelContainer.extend`
  text-align: right;
  font-weight: bold;
  color: ${Colors.black};
`;

export default props => (
  <Container>
    <LabelContainer>
      <Label>料金</Label>
    </LabelContainer>
    <Sales>
      {props.salesAmount}円
    </Sales>
  </Container>
);
