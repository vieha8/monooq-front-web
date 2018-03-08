import React from 'react';
import Path from 'config/path';
import { ContentContainer } from 'components/Page';
import { Content, Text, ToTopLink } from './Shared';

export default () => (
  <ContentContainer>
    <Content>
      <Text>ホストモードでは、メッセージ・スケジュールの確認・スペースの登録や管理・売上履歴の確認が可能です。</Text>
      <ToTopLink href={Path.top()}>トップページへ戻る</ToTopLink>
    </Content>
  </ContentContainer>
);
