// @flow

import React from 'react';
import styled from 'styled-components';
import MenuItem from 'components/atomic/LV2/MenuItem/ServiceMenu';

const Container = styled.ul`
  width: 100%;
`;

type MenuItemProps = {
  href: string,
  notificationCount?: number,
};

type PropTypes = {
  message: MenuItemProps,
  schedule: MenuItemProps,
  spaces: MenuItemProps,
  addSpace: MenuItemProps,
  salesTransfer: MenuItemProps,
  paymentHistory: MenuItemProps,
  becomeHost: MenuItemProps,
  editProfile: MenuItemProps,
  inquiry: MenuItemProps,
  logout: MenuItemProps,
  hasSpace: boolean,
};

export default (props: PropTypes) => (
  <Container>
    <MenuItem title="メッセージ" {...props.message} />
    <MenuItem title="スケジュール" {...props.schedule} />
    {props.hasSpace && <MenuItem title="スペースの管理" {...props.spaces} />}
    {props.hasSpace && <MenuItem title="スペースを追加する" {...props.addSpace} />}
    {props.hasSpace && <MenuItem title="売上確認・振込申請" {...props.sales} />}
    <MenuItem title="プロフィール編集" {...props.editProfile} />
    <MenuItem title="お問い合わせ" {...props.inquiry} />
    <MenuItem title="ログアウト" {...props.logout} />
  </Container>
);
