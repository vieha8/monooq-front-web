// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';

const Container = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 70px;
  color: ${Colors.white};
  background: ${Colors.brandPrimary};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Label1 = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 49px;
  color: ${Colors.white};
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

const Label2 = styled(Label1)`
  font-size: 20px;
  top: auto;
  bottom: 49px;
`;

type PropTypes = {
  onClick: Function,
};

export default ({ onClick }: PropTypes) => (
  <Container onClick={onClick}>
    <Label1>スペースを</Label1>
    <Label2>登録する</Label2>
  </Container>
);
