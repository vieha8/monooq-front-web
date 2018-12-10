// @flow

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuItem from 'components/atomic/LV2/MenuItem/ServiceMenu';
import AvatarIcon from 'components/atomic/LV2/HeaderAction/AvatarIcon';
import { OtherIcon } from 'components/atomic/LV1/ActionIcon';
import { Dimens } from 'variables';

const MenuLink = styled(Link)``;

const LinkWrap = styled.div`
  padding: 1px 0 16px;
`;

const AvaterName = styled.span`
  display: inline-block !important;
  font-weight: bold;
  vertical-align: middle;
  max-width: 140px;
  margin-left: ${Dimens.medium}px;
`;

const OtherIconWrap = styled.span`
  display: inline-block !important;
  vertical-align: middle;
  float: right;
  width: 32px;
  height: 32px;
  margin: 6px auto 0px;
  text-align: center;
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
    {props.isPhone ? (
      <Fragment>
        <LinkWrap>
          <AvatarIcon imageSrc={props.userImage} size={40} />
          <AvaterName>{props.userName}</AvaterName>
          <OtherIconWrap>
            <MenuLink to={props.editProfile.to}>
              <OtherIcon />
            </MenuLink>
          </OtherIconWrap>
        </LinkWrap>
        <MenuItem title="ホーム" {...props.home} line />
      </Fragment>
    ) : (
      <MenuItem title="ホーム" {...props.home} />
    )}
    {props.isLogin && (
      <Fragment>
        <MenuItem title="ホーム" {...props.home} />
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
