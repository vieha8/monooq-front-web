// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Radio from './index';

Radio.displayName = 'Radio';

storiesOf('Atoms/Forms/Radio', module).add(
  'Available',
  withInfo(`
      ### コンポーネント概要
      ラジオボタン
    `)(() => (
    <div>
      <div>
        <Radio checked>家具・家電あり</Radio>
      </div>
      <div>
        <Radio>なし</Radio>
      </div>
    </div>
  )),
);
