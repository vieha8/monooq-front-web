// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';
import InlineText from 'components/atomic/LV1/InlineText';
import Button from 'components/atomic/LV1/Button';

const Row = styled.div`
  width: 100%;
  padding: 24px 8px;
  border-top: 1px solid ${Colors.borderGray};
  &:last-child {
    border-bottom: 1px solid ${Colors.borderGray};
  }
`;

const Label = styled.div`
  margin-bottom: 8px;
`;

const Table = styled.div`
  display: table;
  width: 100%;
`;

const Cell = styled.div`
  display: table-cell;
  ${props =>
    props.width &&
    `
    width: ${props.width};
  `} ${props =>
    props.right &&
    `
    text-align: right;
    margin-left: auto;
  `};
`;

const Supplement = styled.div`
  margin-top: 8px;
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

type PropTypes = {
  transfers: Array<{
    label: string,
    date: string,
    status: string,
    price: string,
  }>,
  supplement: {
    price: string,
  },
  onClickEditBankAccount: Function,
};

export default (props: PropTypes) => (
  <div>
    {props.transfers.map((s, i) => (
      <Row key={`transfers_item_${i}`.toString()}>
        {s.label && (
          <Label>
            <InlineText.Base fontSize={14}>{s.label}</InlineText.Base>
          </Label>
        )}
        <Table>
          <Cell width="140px">
            <InlineText.Base fontSize={14}>{s.date}</InlineText.Base>
          </Cell>
          <Cell>
            <InlineText.Base fontSize={14}>{s.status}</InlineText.Base>
          </Cell>
          <Cell right>
            <InlineText.Bold fontSize={14}>{s.price}円</InlineText.Bold>
          </Cell>
        </Table>
      </Row>
    ))}
    {props.supplement && (
      <Row>
        <Table>
          <Cell>
            <InlineText.Base fontSize={14}>売上</InlineText.Base>
          </Cell>
          <Cell right>
            <InlineText.Bold fontSize={14}>{props.supplement.price}円</InlineText.Bold>
          </Cell>
        </Table>
        <Supplement>
          <InlineText.EmphasisTiny>
            サービス利用手数料を引いた金額が表示されています。
          </InlineText.EmphasisTiny>
        </Supplement>
      </Row>
    )}
    <ButtonWrapper>
      <Button secondary center onClick={props.onClickEditBankAccount}>
        口座情報を変更する
      </Button>
    </ButtonWrapper>
  </div>
);
