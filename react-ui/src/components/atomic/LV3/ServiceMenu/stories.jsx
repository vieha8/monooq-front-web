// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Menu from './index';

Menu.displayName = 'Menu';

storiesOf('Organisms(LV3)/ServiceMenu', module)
  .addDecorator(StoryRouter())
  .add(
    'Host',
    withInfo(`
        ### コンポーネント概要
        サービスメニュー(ホストver)
      `)(() => (
      <div style={{ width: '400px', padding: `${Dimens.storyBookPadding}` }}>
        <Menu
          message={{ href: '#', notificationCount: 10 }}
          schedule={{ href: '#', notificationCount: 2 }}
          spaces={{ href: '#', notificationCount: 0 }}
          addSpace={{ href: '#', notificationCount: 0 }}
          salesTransfer={{ href: '#', notificationCount: 0 }}
          paymentHistory={{ href: '#', notificationCount: 0 }}
          becomeHost={{ href: '#', notificationCount: 0 }}
          editProfile={{ href: '#', notificationCount: 0 }}
          inquiry={{ href: '#', notificationCount: 0 }}
          hasSpace
        />
      </div>
    )),
  )
  .add(
    'User',
    withInfo(`
        ### コンポーネント概要
        サービスメニュー(ユーザver)
      `)(() => (
      <div style={{ width: '400px', padding: `${Dimens.storyBookPadding}` }}>
        <Menu
          message={{ href: '#', notificationCount: 20 }}
          schedule={{ href: '#', notificationCount: 10 }}
          spaces={{ href: '#', notificationCount: 0 }}
          addSpace={{ href: '#', notificationCount: 0 }}
          salesTransfer={{ href: '#', notificationCount: 0 }}
          paymentHistory={{ href: '#', notificationCount: 0 }}
          becomeHost={{ href: '#', notificationCount: 0 }}
          editProfile={{ href: '#', notificationCount: 0 }}
          inquiry={{ href: '#', notificationCount: 0 }}
          hasSpace={false}
        />
      </div>
    )),
  );
