// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import InlineText from 'components/atomic/LV1/InlineText';

const Row = styled.div`
  width: 100%;
  padding: 16px;
  border-top: 1px solid ${Colors.borderGray};
  &:last-child {
    border-bottom: 1px solid ${Colors.borderGray};
  }
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
  `};
`;

type PropTypes = {
  list: Array<{
    label: string,
    text: string,
  }>,
};

export default (props: PropTypes) => (
  <div>
    {props.list.map((item, i) => (
      <Row key={`table_list_item_${i}`.toString()}>
        <Table>
          <Cell width="200px">
            <InlineText.Bold fontSize={14}>{item.label}</InlineText.Bold>
          </Cell>
          <Cell>
            <InlineText.Base fontSize={14}>{item.text}</InlineText.Base>
          </Cell>
        </Table>
      </Row>
    ))}
  </div>
);
