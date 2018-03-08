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
          <MenuLink href={Path.paid(userId)}>
            <MenuText>支払い履歴</MenuText>
          </MenuLink>
        </MenuItem>
        {!hostId &&
          <MenuItem>
            <MenuLink href={Path.createSpaceInfo(userId)}>
              <MenuText>ホストになる</MenuText>
            </MenuLink>
          </MenuItem>
        }
        {hostId &&
          <MenuItem>
            <MenuLink href={Path.hostMode(userId)}>
              <MenuText>ホストモードに切り替える</MenuText>
            </MenuLink>
          </MenuItem>
        }
        <MenuItem>
          <MenuLink href={Path.inquiry(userId)}>
            <MenuText>お問い合わせ</MenuText>
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink href={Path.logout(userId)}>
            <MenuText>ログアウト</MenuText>
          </MenuLink>
        </MenuItem>
      </Menu>
    </Container>
  );
};
