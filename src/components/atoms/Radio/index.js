// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';

const Container = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const RADIO_SIZE = 20;
const RADIO_CHECK_SIZE = 8;
const Radio = styled.div`
  display: inline-block;
  position: relative;
  width: ${RADIO_SIZE}px;
  height: ${RADIO_SIZE}px;
  background: ${Colors.white};
  border: 1px solid ${Colors.brandPrimary};
  border-radius: 10px;
  ${props =>
    props.checked &&
    `
    &:after {
      content: "";
      display: block;
      margin-top: ${(RADIO_SIZE - RADIO_CHECK_SIZE) / 2 - 1}px;
      margin-left: ${(RADIO_SIZE - RADIO_CHECK_SIZE) / 2 - 1}px;
      width: ${RADIO_CHECK_SIZE}px;
      height: ${RADIO_CHECK_SIZE}px;
      border-radius: ${RADIO_CHECK_SIZE / 2}px;
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
  line-height: ${RADIO_SIZE}px;
`;

type PropTypes = {
  checked?: boolean,
  children: string,
  onClick: Function,
};

export default (props: PropTypes) => (
  <Container onClick={props.onClick}>
    <Radio checked={props.checked} />
    <Label>{props.children}</Label>
  </Container>
);
