import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from '../../variables';

const Container = styled.div`
  text-align: center;
`;

const Button = styled.button`
  display: inline-block;
  background: ${Colors.buttonPink};
  padding: 9px 70px;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.white};
  border-radius: 3px;
  &:hover {
    background: ${Colors.buttonPinkHover};
  }
  cursor: pointer;
  border: none;
  outline:none;
`;

const SubText = styled.span`
  display: inline-block;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.gray};
  margin-top: ${Dimens.medium}px;
`;

export default props => (
  <Container>
    <Button onClick={props.onClickSendMessage}>メッセージを送る</Button><br />
    <SubText>ご請求はまだ発生しません</SubText>
  </Container>
);
