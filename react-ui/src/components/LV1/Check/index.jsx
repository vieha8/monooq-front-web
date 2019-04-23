// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import { Checkbox } from 'semantic-ui-react';

const Container = styled.div`
  display: inline-block;
  cursor: pointer;
  vertical-align: top;
`;

const CHECK_SIZE = 16;

const Label = styled.div`
  display: inline-block;
  font-size: 15px;
  color: ${Colors.black};
  margin-left: 10px;
  vertical-align: top;
  line-height: ${CHECK_SIZE}px;
`;

type PropTypes = {
  checked?: boolean,
  children: string,
  onClick: Function,
};

export default ({ onClick, checked, children }: PropTypes) => (
  <Container onClick={onClick}>
    <Checkbox checked={checked} />
    <Label>{children}</Label>
  </Container>
);
