// @flow

import React from 'react';
import styled from 'styled-components';
import MenuItem from 'components/atomic/molecules/MenuItem/HelpMenu';
import Path from 'config/path';

const Container = styled.ul`
  width: 100%;
`;

type MenuItemProps = {
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
      href={Path.helpService()}
      fillColor
    />
    <MenuItem
      title="取引について"
      {...props.aboutUserTransaction}
      href={Path.helpTransaction()}
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
      href="#"
      fillColor
    />
    <MenuItem
      title="スペース登録について"
      {...props.aboutRegisterSpace}
      href="#"
      fillColor
    />
    <MenuItem
      title="取引について"
      {...props.aboutHostTransaction}
      href="#"
      fillColor
    />
    <MenuItem
      title="売上や振込について"
      {...props.aboutSalesTransfer}
      href="#"
      fillColor
    />
    <MenuItem
      title="登録・ログインについて"
      {...props.aboutLogin}
      href="#"
      show
      angleRight
    />
    <MenuItem
      title="その他"
      {...props.other}
      href="#"
      show
      angleRight
    />
  </Container>
);
