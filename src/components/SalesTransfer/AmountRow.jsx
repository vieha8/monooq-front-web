import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';

const Container = styled.div`
  display: table;
  width: 100%;
  padding: ${Dimens.medium2}px ${Dimens.medium}px;
  font-size: ${FontSizes.small};
  color: ${Colors.black};
  border-bottom: 1px solid ${Colors.borderGray};
  &:first-child {
    border-top: 1px solid ${Colors.borderGray};
  }
`;

const Label1 = styled.span`
  display: table-cell;
  font-size: ${FontSizes.small}px;
  max-width: 40px;
`;

const Label2 = Label1.extend`
  display: table-cell;
  padding-left: ${Dimens.meidum2}px;
`;

const Amount = Label1.extend`
  text-align: right;
  font-weight: bold;
`;

export default props => (
  <Container>
    <Label1>{props.label1}</Label1>
    {props.label2 && <Label2>{props.label2}</Label2>}
    <Amount>{props.amount}円</Amount>
  </Container>
);
