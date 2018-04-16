// @flow

import React from 'react';
import styled from 'styled-components';
import ClearfixContainer from 'components/atomic/atoms/ClearfixContainer';
import Card from 'components/atomic/atoms/Card';
import InlineText from 'components/atomic/atoms/InlineText';
import TextLink from 'components/atomic/atoms/TextLink';
import { Colors } from 'variables';

const ActionTable = styled.div`
  display: table;
  width: 100%;
  margin-top: 8px;
`;

const RetryCell = styled.div`
  display: table-cell;
  text-align: left;
`;

const DateCell = styled.div`
  display: table-cell;
  text-align: right;
`;

type PropTypes = {
  message: string,
  sentAt: string,
  error?: boolean,
  onClickRetry: Function,
};

export default (props: PropTypes) => (
  <ClearfixContainer>
    <Card block noBorder background={Colors.pink}>
      <InlineText.Base fontSize={14}>{props.message}</InlineText.Base>
    </Card>
    <ActionTable>
      <RetryCell>
        {props.error && (
          <TextLink error={1} onClick={props.onClickRetry} fontSize={12}>
            エラー：送信されていません。クリックして再試行します。
          </TextLink>
        )}
      </RetryCell>
      <DateCell>
        <InlineText.Emphasis>{props.sentAt}</InlineText.Emphasis>
      </DateCell>
    </ActionTable>
  </ClearfixContainer>
);
