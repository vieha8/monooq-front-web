// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import InlineText from 'components/atomic/LV1/InlineText';

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

type PropTypes = {
  confirmedSales: string,
  provisionalSales: string,
};

export default (props: PropTypes) => (
  <div>
    <Row>
      <Table>
        <Cell>
          <InlineText.Base fontSize={14}>現在の売上</InlineText.Base>
        </Cell>
        <Cell right>
          <InlineText.Bold fontSize={14}>{props.confirmedSales}円</InlineText.Bold>
        </Cell>
      </Table>
    </Row>
    <Row>
      <Table>
        <Cell>
          <InlineText.Base fontSize={14}>取引が終了していない売上</InlineText.Base>
        </Cell>
        <Cell right>
          <InlineText.Bold fontSize={14}>{props.provisionalSales}円</InlineText.Bold>
        </Cell>
      </Table>
    </Row>
  </div>
);
