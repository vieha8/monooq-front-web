// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import HostEntry from './index';

HostEntry.displayName = 'HostEntry';

storiesOf('Atoms/Util/HostEntry', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      スペース登録ボタン(円形)
    `)(() => (
    <div>
      <HostEntry onClick={() => console.log('onClick HostEntry')} />
    </div>
  )),
);
