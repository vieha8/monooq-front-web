// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/atoms/Button';

const Container = styled.div`
  display: table;
  width: 100%;
`;

const Cell = styled.div`
  display: table-cell;
  width: 50%;
  text-align: ${props => props.align};
`;

const Wrapper = styled.div`
  max-width: 224px;
`;

type PropTypes = {
  backButton: React.Element<Button.Secondary>,
  disabledButton: React.Element<Button.Primary>,
  enabledButton: React.Element<Button.Primary>,
  enabled: boolean,
}

export default (props: PropTypes) => (
  <Container>
    <Cell align="left"><Wrapper>{props.backButton}</Wrapper></Cell>
    <Cell align="right"><Wrapper>{props.enabled ? props.enabledButton : props.disabledButton}</Wrapper></Cell>
  </Container>
);
