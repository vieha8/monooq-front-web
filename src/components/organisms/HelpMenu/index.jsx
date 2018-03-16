// @flow

import React from 'react';
import styled from 'styled-components';
import MenuItem from 'components/molecules/MenuItem/HelpMenu';

const Container = styled.ul`
  width: 100%;
`;

type MenuItemProps = {
  href: string,
  show?: boolean,
  open?: boolean,
}

type PropTypes = {
  howToUser: MenuItemProps,
  onClickHowToUser: Function,
  aboutService: MenuItemProps,
  aboutUserTransaction: MenuItemProps,
  howToBeHost: MenuItemProps,
  onClickHowToBeHost: Function,
  aboutHost: MenuItemProps,
  aboutRegisterSpace: MenuItemProps,
  aboutHostTransaction: MenuItemProps,
  aboutSalesTransfer: MenuItemProps,
  aboutLogin: MenuItemProps,
  other: MenuItemProps,
}

export default (props: PropTypes) => (
  <Container>
    <MenuItem
      title="物置スペースを利用したい"
      {...props.howToUser}
      onClick={props.onClickHowToUser}
      show
      angleDown
    />
    <MenuItem
      title="サービスについて"
      {...props.aboutService}
      fillColor
    />
    <MenuItem
      title="取引について"
      {...props.aboutUserTransaction}
      fillColor
    />
    <MenuItem
      title="ホストになりたい"
      {...props.howToBeHost}
      onClick={props.onClickHowToBeHost}
      show
      angleDown
    />
    <MenuItem
      title="ホストについて"
      {...props.aboutHost}
      fillColor
    />
    <MenuItem
      title="スペース登録について"
      {...props.aboutRegisterSpace}
      fillColor
    />
    <MenuItem
      title="取引について"
      {...props.aboutHostTransaction}
      fillColor
    />
    <MenuItem
      title="売上や振込について"
      {...props.aboutSalesTransfer}
      fillColor
    />
    <MenuItem
      title="登録・ログインについて"
      {...props.aboutLogin}
      show
      angleRight
    />
    <MenuItem
      title="その他"
      {...props.other}
      show
      angleRight
    />
  </Container>
);
