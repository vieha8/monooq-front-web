// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import MenuItem from 'components/LV2/Items/MenuItem';
import AvatarIcon from 'components/LV2/ButtonHeader/AvatarIcon';
import { Dimens } from 'variables';
import { formatName } from 'helpers/string';

const LinkWrap = styled.div`
  padding: 1px 25px ${Dimens.medium}px;
`;

const AvaterName = styled.span`
  display: inline-block !important;
  font-weight: bold;
  vertical-align: middle;
  max-width: calc(100% - 56px);
  margin-left: ${Dimens.medium}px;
`;

type MenuItemProps = {
  href?: string,
  to?: string,
  notificationCount?: number,
  onClick?: Function,
};

type PropTypes = {
  isPhone: boolean,
  userImage?: string,
  userName?: string,
  home: MenuItemProps,
  isLogin: boolean,
  message: MenuItemProps,
  isSchedule?: boolean,
  schedule: MenuItemProps,
  editProfile: MenuItemProps,
  isHost: boolean,
  addSpace: MenuItemProps,
  spaces: MenuItemProps,
  sales: MenuItemProps,
  howToUse: MenuItemProps,
  inquiry: MenuItemProps,
  service: MenuItemProps,
  changePurposeEvent: Function,
  logoutEvent: Function,
};

export default ({
  isPhone,
  userImage,
  userName,
  home,
  isLogin,
  message,
  isSchedule,
  schedule,
  editProfile,
  isHost,
  addSpace,
  spaces,
  sales,
  howToUse,
  inquiry,
  service,
  changePurposeEvent,
  logoutEvent,
}: PropTypes) => (
  <Fragment>
    {isPhone && (
      <Fragment>
        <LinkWrap>
          <AvatarIcon imageSrc={userImage} size={40} />
          <AvaterName>{formatName(userName)}</AvaterName>
        </LinkWrap>
      </Fragment>
    )}
    {isLogin && (
      <Fragment>
        <MenuItem title="ホーム" {...home} line={isPhone} />
        <MenuItem title="メッセージ" {...message} />
        {isSchedule && <MenuItem title="利用状況" {...schedule} />}
        <MenuItem title="プロフィールの編集" {...editProfile} />
        {isHost && (
          <Fragment>
            <MenuItem title="スペースの登録" {...addSpace} line />
            <MenuItem title="スペースの管理" {...spaces} />
            <MenuItem title="売り上げ・振込申請" {...sales} />
          </Fragment>
        )}
      </Fragment>
    )}
    <MenuItem title="ご利用ガイド・よくある質問" {...howToUse} line={isLogin} />
    <MenuItem title="お問い合わせ" {...inquiry} />
    <MenuItem title="モノオクについて" {...service} />
    {isLogin && (
      <Fragment>
        <MenuItem
          title={isHost ? 'スペース登録機能の使用をやめる' : 'スペース登録機能を使用する'}
          {...changePurposeEvent}
          blank
          line
        />
        <MenuItem title="ログアウト" {...logoutEvent} blank line logout />
      </Fragment>
    )}
  </Fragment>
);
