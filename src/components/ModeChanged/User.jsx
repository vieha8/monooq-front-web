import React from 'react';
import Path from 'config/path';
import { ContentContainer } from 'components/Page';
import { Content, Text, ToTopLink } from './Shared';

export default () => (
  <ContentContainer>
    <Content>
      <Text>ユーザーモードでは、メッセージ・スケジュール・支払い履歴の確認が可能です。</Text>
      <ToTopLink href={Path.top()}>トップページへ戻る</ToTopLink>
    </Content>
  </ContentContainer>
);
