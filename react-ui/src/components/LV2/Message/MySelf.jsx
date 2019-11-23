import React from 'react';
import styled from 'styled-components';
import ContainerClearfix from 'components/LV1/ContainerClearfix';
import Card from 'components/LV1/Card';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';
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

export default ({ message, error, onClickRetry, sentAt, isRead }) => (
  <ContainerClearfix>
    <Card block noBorder background={Colors.lightGray2} isPadding={24}>
      <InlineText.Base fontSize={15}>{message}</InlineText.Base>
    </Card>
    <ActionTable>
      <RetryCell>
        {error && (
          <TextLink error={1} onClick={onClickRetry} fontSize={15}>
            エラー：送信されていません。クリックして再試行します。
          </TextLink>
        )}
      </RetryCell>
      <DateCell>
        <InlineText.EmphasisTiny>
          {sentAt}
          <br />
          {isRead ? '既読' : null}
        </InlineText.EmphasisTiny>
      </DateCell>
    </ActionTable>
  </ContainerClearfix>
);
