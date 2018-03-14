// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import InlineText from 'components/atoms/InlineText';

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
  ${props => props.width && `
    width: ${props.width};
  `}
  ${props => props.right && `
    text-align: right;
    margin-left: auto;
  `}
`;

const Supplement = styled.div`
  margin-top: 8px;
`;

type PropTypes = {
  sales: Array<{
    label: string,
    date: string,
    status: string,
    price: string,
  }>,
  supplement: {
    price: string,
  },
}

export default (props: PropTypes) => (
  <div>
    {props.sales.map((s, i) => (
      <Row key={`sales_item_${i}`}>
        {s.label && <Label><InlineText.Base fontSize={14}>{s.label}</InlineText.Base></Label>}
        <Table>
          <Cell width="140px"><InlineText.Base fontSize={14}>{s.date}</InlineText.Base></Cell>
          <Cell><InlineText.Base fontSize={14}>{s.status}</InlineText.Base></Cell>
          <Cell right><InlineText.Bold fontSize={14}>{s.price}円</InlineText.Bold></Cell>
        </Table>
      </Row>
    ))}
    {props.supplement && (
      <Row>
        <Table>
          <Cell><InlineText.Base fontSize={14}>売上</InlineText.Base></Cell>
          <Cell right><InlineText.Bold fontSize={14}>{props.supplement.price}円</InlineText.Bold></Cell>
        </Table>
        <Supplement><InlineText.Emphasis>サービス利用手数料を引いた金額が表示されています。</InlineText.Emphasis></Supplement>
      </Row>
    )}
  </div>
);
