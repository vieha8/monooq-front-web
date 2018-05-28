import React from 'react';
import Router from 'next/router';
import { Menu } from 'semantic-ui-react';

const Header = () => (
  <Menu>
    <Menu.Item onClick={() => Router.push('/')}>全メッセージ一覧</Menu.Item>
    <Menu.Item onClick={() => Router.push('/search')}>スペース検索ワードログ</Menu.Item>
    <Menu.Item onClick={() => Router.push('/search/ranking')}>
      スペース検索ワードランキング
    </Menu.Item>
  </Menu>
);

export default Header;
