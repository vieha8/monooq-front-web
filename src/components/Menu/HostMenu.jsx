import React from 'react';
import { Container, Menu, MenuItem, MenuText, NoticeCount } from './Shared';

export default (props) => {
  const { messageCount, scheduleCount } = props;
  return (
    <Container>
      <Menu>
        <MenuItem><MenuText>メッセージ</MenuText><NoticeCount count={messageCount} /></MenuItem>
        <MenuItem><MenuText>預かるスケジュール</MenuText><NoticeCount count={scheduleCount} /></MenuItem>
        <MenuItem><MenuText>スペースの管理</MenuText></MenuItem>
        <MenuItem><MenuText>スペースを追加する</MenuText></MenuItem>
        <MenuItem><MenuText>売上履歴・振込申請</MenuText></MenuItem>
        <MenuItem><MenuText>ユーザーモードに切り替える</MenuText></MenuItem>
        <MenuItem><MenuText>お問い合わせ</MenuText></MenuItem>
        <MenuItem><MenuText>ログアウト</MenuText></MenuItem>
      </Menu>
    </Container>
  );
};
