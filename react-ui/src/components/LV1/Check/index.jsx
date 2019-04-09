// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';

const Container = styled.div`
  display: inline-block;
  cursor: pointer;
  vertical-align: top;
`;

const CHECK_SIZE = 16;
const Check = styled.div`
  display: inline-block;
  vertical-align: top;
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
      font-family: "Font Awesome 5 Free";
      font-size: 0.9em;
      font-weight: 900;
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

export default (props: PropTypes) => (
  <Container onClick={props.onClick}>
    <Check checked={props.checked} onKeyDown={props.onKeyDown} tabIndex={0} />
    <Label>{props.children}</Label>
  </Container>
);
