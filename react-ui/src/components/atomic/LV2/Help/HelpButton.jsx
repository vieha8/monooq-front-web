// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from 'components/atomic/LV1/Card';
import InlineText from 'components/atomic/LV1/InlineText';
import { AngleRight } from 'components/atomic/LV1/ActionIcon';
import { Colors } from 'variables';

const Container = styled(Link)`
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
  ${props =>
    props.right &&
    `
    margin-left: auto;
    text-align: right;
  `};
`;

type PropTypes = {
  title: string,
  href?: string,
  onClick?: Function,
};

export default (props: PropTypes) => (
  <Card block noPadding>
    <Container to={props.href || ''} onClick={props.onClick}>
      <Cell>
        <InlineText.Base fontSize={14}>{props.title}</InlineText.Base>
      </Cell>
      <Cell right>
        <AngleRight color={Colors.linkBlue} />
      </Cell>
    </Container>
  </Card>
);
