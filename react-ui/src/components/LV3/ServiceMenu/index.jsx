// @flow

import React, { Fragment } from 'react';
import MenuItem from 'components/LV2/Items/MenuItem';
import InfoUser from 'components/LV2/InfoUser';

type MenuItemProps = {
  href?: string,
  to?: string,
  notificationCount?: number,
  onClick?: Function,
};

type PropTypes = {
  userId?: string,
  userImage?: string,
  userName?: string,
  signupUrl: MenuItemProps,
  loginUrl: MenuItemProps,
  top: MenuItemProps,
  isLogin: boolean,
  isSchedule?: boolean,
  schedule: MenuItemProps,
  isHost: boolean,
  addSpace: MenuItemProps,
  spaces: MenuItemProps,
  sales: MenuItemProps,
  inquiry: MenuItemProps,
  help: MenuItemProps,
  logoutEvent: Function,
};

export default ({
  userId,
  userImage,
  userName,
  signupUrl,
  loginUrl,
  top,
  isLogin,
  isSchedule,
  schedule,
  isHost,
  addSpace,
  spaces,
  sales,
  inquiry,
  help,
  logoutEvent,
}: PropTypes) => (
  <Fragment>
    {isLogin ? (
      <Fragment>
        <InfoUser isHost={isHost} id={userId} imageUrl={userImage} name={userName} />
        {isHost && (
          <Fragment>
            <MenuItem title="スペース運営" header />
            <MenuItem title="スペースの新規登録" {...addSpace} />
            <MenuItem title="スペースの管理" {...spaces} />
            {isSchedule && <MenuItem title="利用状況" {...schedule} />}
            <MenuItem title="売上・振込申請" {...sales} />
          </Fragment>
        )}
      </Fragment>
    ) : (
      <Fragment>
        <MenuItem title="新規登録・ログイン" header />
        <MenuItem title="新規登録" {...signupUrl} />
        <MenuItem title="ログイン" {...loginUrl} />
      </Fragment>
    )}
    <MenuItem title="サービスについて" header />
    {isLogin ? (
      <MenuItem title="トップページ" {...top} />
    ) : (
      <MenuItem title="モノオクとは？(未実装)" {...top} />
    )}
    <MenuItem title="利用の流れ(未実装)" {...inquiry} />
    <MenuItem title="よくある質問" {...help} blank />
    <MenuItem title="お問い合わせ" {...inquiry} />
    {isLogin && <MenuItem title="ログアウト" {...logoutEvent} blank logout />}
  </Fragment>
);
