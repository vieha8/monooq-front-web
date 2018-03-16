// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Menu from './index';

storiesOf('Organisms/ServiceMenu', module)
  .add('Host', () => (
    <div style={{ width: '320px' }}>
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
        logout={{ href: '#', notificationCount: 0 }}
        hasSpace
      />
    </div>
  ))
  .add('User', () => (
    <div style={{ width: '320px' }}>
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
        logout={{ href: '#', notificationCount: 0 }}
        hasSpace={false}
      />
    </div>
  ));
