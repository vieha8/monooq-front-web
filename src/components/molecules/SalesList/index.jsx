// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import InlineText from 'components/atoms/InlineText';

const Row = styled.div`
  display: table;
  width: 100%;
  padding: 24px 8px;
  border-top: 1px solid ${Colors.borderGray};
  &:last-child {
    border-bottom: 1px solid ${Colors.borderGray};
  }
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

type PropTypes = {
  sales: Array<{
    date: string,
    status: string,
    price: string,
  }>,
}

export default (props: PropTypes) => (
  <div>
    {props.sales.map((s, i) => (
      <Row key={`sales_item_${i}`}>
        <Cell width="140px"><InlineText.Base fontSize={14}>{s.date}</InlineText.Base></Cell>
        <Cell><InlineText.Base fontSize={14}>{s.status}</InlineText.Base></Cell>
        <Cell right><InlineText.Bold fontSize={14}>{s.price}円</InlineText.Bold></Cell>
      </Row>
    ))}
  </div>
);
