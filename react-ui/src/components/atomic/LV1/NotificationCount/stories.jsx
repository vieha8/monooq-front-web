// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import NotificationCount from './index';

NotificationCount.displayName = 'NotificationCount';

storiesOf('Atoms/Util/NotificationCount', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      通知カウントバッチ
    `)(() => <NotificationCount count={10} />),
);
