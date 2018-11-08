// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import NotificationCount from './index';

NotificationCount.displayName = 'NotificationCount';

storiesOf('Atoms(LV1)/Util/NotificationCount', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      通知カウントバッチ
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <NotificationCount count={10} />
    </div>
  )),
);
