import React from 'react';
import Path from 'config/path';
import { Container, Menu, MenuLink, MenuItem, MenuText, NoticeCount } from './Shared';

export default (props) => {
  const { messageCount, scheduleCount, userId, hostId, showMobile } = props;
  return (
    <Container showMobile={showMobile}>
      <Menu>
        <MenuItem>
          <MenuLink href={Path.messages(userId)}>
            <MenuText>メッセージ</MenuText><NoticeCount count={messageCount} />
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href={Path.schedule(userId)}>
            <MenuText>スケジュール</MenuText><NoticeCount count={scheduleCount} />
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href={Path.messages(hostId)}>
            <MenuText>スペースの管理</MenuText>
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href={Path.createSpaceInfo(hostId)}>
            <MenuText>スペースを追加する</MenuText>
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href={Path.salesTransfers(hostId)}>
            <MenuText>売上履歴・振込申請</MenuText>
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href={Path.messages(hostId)}>
            <MenuText>ユーザーモードに切り替える</MenuText>
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href={Path.inquiry(userId)}>
            <MenuText>お問い合わせ</MenuText>
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink onClick={props.onClickLogout}>
            <MenuText>ログアウト</MenuText>
          </MenuLink>
        </MenuItem>
      </Menu>
    </Container>
  );
};
