import React from 'react';
import { Container, Menu, MenuItem, MenuText, NoticeCount } from './Shared';

export default (props) => {
  const { messageCount, scheduleCount, showMobile } = props;
  return (
    <Container showMobile={showMobile}>
      <Menu>
        <MenuItem><MenuText>メッセージ</MenuText><NoticeCount count={messageCount} /></MenuItem>
        <MenuItem><MenuText>預かりスケジュール</MenuText><NoticeCount count={scheduleCount} /></MenuItem>
        <MenuItem><MenuText>支払い履歴</MenuText></MenuItem>
        <MenuItem><MenuText>ホストになる</MenuText></MenuItem>
        <MenuItem><MenuText>ホストモードに切り替える</MenuText></MenuItem>
        <MenuItem><MenuText>お問い合わせ</MenuText></MenuItem>
        <MenuItem><MenuText>ログアウト</MenuText></MenuItem>
      </Menu>
    </Container>
  );
};
