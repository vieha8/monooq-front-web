// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';

const Container = styled.div`
  display: inline-block;
  cursor: pointer;
  vertical-align: top;
`;

const CHECK_SIZE = 20;
const Check = styled.div`
  display: inline-block;
  width: ${CHECK_SIZE}px;
  height: ${CHECK_SIZE}px;
  background: ${Colors.white};
  border: 1px solid ${Colors.brandPrimary};
  border-color: ${Colors.lightGray1};
  border-radius: 3px;
  text-align: center;
  ${props =>
    props.checked &&
    `
    border-color: ${Colors.brandPrimary};
    &:after {
      content: "\f00c";
      font-family: "Fontawesome";
      display: block;
      color: ${Colors.white};
      width: 100%;
      height: 100%;
      background: ${Colors.brandPrimary};
    }
  `};
`;

const Label = styled.div`
  display: inline-block;
  font-size: 14px;
  color: ${Colors.black};
  margin-left: 20px;
  vertical-align: top;
  line-height: ${CHECK_SIZE}px;
`;

type PropTypes = {
  checked?: boolean,
  children: string,
};

export default (props: PropTypes) => (
  <Container>
    <Check checked={props.checked} />
    <Label>{props.children}</Label>
  </Container>
);
