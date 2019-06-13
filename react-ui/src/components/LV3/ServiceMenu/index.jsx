// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import MenuItem from 'components/LV2/MenuItem/ServiceMenu';
import AvatarIcon from 'components/LV2/HeaderAction/AvatarIcon';
import { Dimens } from 'variables';
import { formatName } from 'helpers/string';

const LinkWrap = styled.div`
  padding: 1px 25px ${Dimens.medium}px;
`;

const AvaterName = styled.span`
  display: inline-block !important;
  font-weight: bold;
  vertical-align: middle;
  max-width: 140px;
  margin-left: ${Dimens.medium}px;
`;

type MenuItemProps = {
  href: string,
  to: string,
  notificationCount?: number,
};

type PropTypes = {
  home: MenuItemProps,
  message: MenuItemProps,
  schedule: MenuItemProps,
  spaces: MenuItemProps,
  addSpace: MenuItemProps,
  sales: MenuItemProps,
  editProfile: MenuItemProps,
  inquiry: MenuItemProps,
  howToUse: MenuItemProps,
  aboutMonooq: MenuItemProps,
  isPhone: boolean,
  isLogin: boolean,
  logout: Function,
};

export default (props: PropTypes) => (
  <Fragment>
    {props.isPhone && (
      <Fragment>
        <LinkWrap>
          <AvatarIcon imageSrc={props.userImage} size={40} />
          <AvaterName>{formatName(props.userName)}</AvaterName>
        </LinkWrap>
      </Fragment>
    )}
    {props.isLogin && (
      <Fragment>
        <MenuItem title="ホーム" {...props.home} line={props.isPhone} />
        <MenuItem title="メッセージ" {...props.message} />

        {/* TODO: 1件以上ある場合に表示 */}
        <MenuItem title="利用状況" {...props.schedule} />
        <MenuItem title="プロフィールの編集" {...props.editProfile} />
        {/* 目的がhostの場合のみ法事 */}
        <MenuItem title="スペースの登録" {...props.addSpace} line />
        <MenuItem title="スペースの管理" {...props.spaces} />
        <MenuItem title="売り上げ・振込申請" {...props.sales} />
      </Fragment>
    )}
    <MenuItem title="モノオクの使い方・ヘルプ" {...props.howToUse} line={props.isLogin} />
    <MenuItem title="お問い合わせ" {...props.inquiry} />
    <MenuItem title="モノオクについて" {...props.aboutMonooq} />
    {props.isLogin && (
      <Fragment>
        <MenuItem
          title={'スペース登録機能の使用をやめる' || 'スペース登録機能を使用する'}
          {...props.other}
          line
        />
        <MenuItem title="ログアウト" {...props.logoutEvent} blank line logout />
      </Fragment>
    )}
  </Fragment>
);
