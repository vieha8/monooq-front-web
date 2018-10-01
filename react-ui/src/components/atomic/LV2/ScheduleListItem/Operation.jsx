// @flow

import React from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import TextLink from 'components/atomic/LV1/TextLink';
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

const Message = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Other = styled(Message)`
  text-align: right;
`;

type PropTypes = {
  roomId: string,
  otherAction?: {
    text: string,
    href: string,
  },
};

export default (props: PropTypes) => (
  <Container>
    <OperationContainer>
      <Message>
        <TextLink to={Path.message(props.roomId)} fontSize={FontSizes.xsmall}>
          メッセージをみる
        </TextLink>
      </Message>
      {props.otherAction && (
        <Other>
          <TextLink to={props.otherAction.href} fontSize={FontSizes.xsmall}>
            {props.otherAction.text}
          </TextLink>
        </Other>
      )}
    </OperationContainer>
  </Container>
);
