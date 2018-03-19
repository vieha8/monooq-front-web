import React, { Fragment } from 'react';
import Path from 'config/path';
import { Container, Menu, MenuLink, MenuItem, MenuText, NoticeCount } from './Shared';

export default (props) => {
  const { messageCount, scheduleCount, userId, showMobile } = props;
  const hasSpace = true;
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
        {hasSpace && (
          <Fragment>
            <MenuItem>
              <MenuLink href={Path.spaces(userId)}>
                <MenuText>スペースの管理</MenuText><NoticeCount count={scheduleCount} />
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href={Path.createSpaceInfo()}>
                <MenuText>スペースを追加する</MenuText><NoticeCount count={scheduleCount} />
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink href={Path.requestTransfer()}>
                <MenuText>振込申請</MenuText><NoticeCount count={scheduleCount} />
              </MenuLink>
            </MenuItem>
          </Fragment>
        )}
        {/*<MenuItem>*/}
          {/*<MenuLink href={Path.paid(userId)}>*/}
            {/*<MenuText>支払い履歴</MenuText>*/}
          {/*</MenuLink>*/}
        {/*</MenuItem>*/}
        {!hasSpace &&
          <MenuItem>
            <MenuLink href={Path.createSpaceInfo(userId)}>
              <MenuText>ホスト登録する</MenuText>
            </MenuLink>
          </MenuItem>
        }
        <MenuItem>
          <MenuLink href={Path.editProfile(userId)}>
            <MenuText>プロフィールを編集する</MenuText>
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
