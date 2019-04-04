// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import MenuItem from 'components/LV2/MenuItem/ServiceMenu';
import AvatarIcon from 'components/LV2/HeaderAction/AvatarIcon';
import { Dimens } from 'variables';

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
  help: MenuItemProps,
  inquiry: MenuItemProps,
  howToUse: MenuItemProps,
  other: MenuItemProps,
  isPhone: boolean,
  isLogin: boolean,
};

export default (props: PropTypes) => (
  <Fragment>
    {props.isPhone && (
      <Fragment>
        <LinkWrap>
          <AvatarIcon imageSrc={props.userImage} size={40} />
          <AvaterName>{props.userName}</AvaterName>
        </LinkWrap>
      </Fragment>
    )}
    {props.isLogin && (
      <Fragment>
        <MenuItem title="ホーム" {...props.home} line={props.isPhone} />
        <MenuItem title="メッセージ" {...props.message} />
        <MenuItem title="利用状況" {...props.schedule} />
        <MenuItem title="スペースの登録" {...props.addSpace} line />
        <MenuItem title="スペースの管理" {...props.spaces} />
        <MenuItem title="売上・振込申請" {...props.sales} />
        <MenuItem title="プロフィール編集" {...props.editProfile} />
      </Fragment>
    )}
    <MenuItem title="ヘルプ" {...props.help} blank line={props.isLogin} />
    <MenuItem title="お問い合わせ" {...props.inquiry} />
    <MenuItem title="モノオクの使い方" {...props.howToUse} />
    <MenuItem title="その他" {...props.other} />
  </Fragment>
);
