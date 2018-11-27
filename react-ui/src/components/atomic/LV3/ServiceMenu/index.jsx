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
  hasSpace: boolean,
};

export default (props: PropTypes) => (
  <Container>
    <MenuItem title="ホーム" {...props.home} />
    <MenuItem title="メッセージ" {...props.message} />
    <MenuItem title="利用状況" {...props.schedule} />
    <MenuItem title="スペースの登録" {...props.addSpace} line />
    <MenuItem title="スペースの管理" {...props.spaces} />
    <MenuItem title="売り上げ・振込申請" {...props.sales} />
    <MenuItem title="プロフィール編集" {...props.editProfile} />
    <MenuItem title="ヘルプ" {...props.help} blank line />
    <MenuItem title="お問い合わせ" {...props.inquiry} />
    <MenuItem title="モノオクの使い方" {...props.howToUse} />
    <MenuItem title="その他" {...props.other} />
  </Container>
);
