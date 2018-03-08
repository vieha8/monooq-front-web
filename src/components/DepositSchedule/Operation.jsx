import React from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import { Colors, FontSizes, Dimens } from 'variables';

const Container = styled.div`
  width: 100%;
  border-top: 1px solid ${Colors.borderGray};
  padding: ${Dimens.medium}px 0;
`;

const OperationContainer = styled.div`
  display: table;
  width: 100%;
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  padding: ${Dimens.small}px ${Dimens.medium}px;
`;

const Message = styled.a`
  display: table-cell;
  vertical-align: middle;
  font-size: ${FontSizes.small}px;
  color: ${Colors.linkBlue};
  text-decoration: none;
  &:hover {
    color: ${Colors.linkBlue};
  }
`;

const Other = Message.extend`
  text-align: right;
  color: ${Colors.lightGray1};
  &:hover {
    color: ${Colors.lightGray1};    
  }
`;

export default props => (
  <Container>
    <OperationContainer>
      <Message href={Path.message('iKuod7UQgX50rappC5Fs')}>メッセージをみる</Message>
      <Other href={props.other.href}>{props.other.text}</Other>
    </OperationContainer>
  </Container>
);
