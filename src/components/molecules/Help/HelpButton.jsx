// @flow

import React from 'react';
import styled from 'styled-components';
import Card from 'components/atoms/Card';
import InlineText from 'components/atoms/InlineText';
import { AngleRight } from 'components/atoms/ActionIcon';
import { Colors } from 'variables';

const Container = styled.a`
  display: table;
  width: 100%;
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background: ${Colors.lightGray2Bg};
  }
`;

const Cell = styled.div`
  display: table-cell;
  vertical-align: middle;
  ${props => props.right && `
    margin-left: auto;
    text-align: right;
  `}
`;

type PropTypes = {
  title: string,
  href?: string,
  onClick?: Function,
}

export default (props: PropTypes) => (
  <Card block noPadding>
    <Container href={props.href} onClick={props.onClick}>
      <Cell>
        <InlineText.Base fontSize={14}>{props.title}</InlineText.Base>
      </Cell>
      <Cell right>
        <AngleRight />
      </Cell>
    </Container>
  </Card>
);
