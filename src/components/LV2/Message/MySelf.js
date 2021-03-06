import React from 'react';
import Linkify from 'react-linkify';
import styled from 'styled-components';
import PageClearfix from 'components/LV1/PageClearfix';
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
  <PageClearfix>
    <Card block noBorder background={Colors.lightGray2} padding={24} paddingSp={14}>
      <InlineText.Base fontSize={15}>
        <Linkify properties={{ target: '_blank' }}>{message}</Linkify>
      </InlineText.Base>
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
  </PageClearfix>
);
