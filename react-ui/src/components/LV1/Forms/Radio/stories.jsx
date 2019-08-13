// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Radio from './index';

Radio.displayName = 'Radio';

storiesOf('Atoms(LV1)/Forms/Radio', module).add(
  'Available',
  withInfo(`
      ### コンポーネント概要
      ラジオボタン
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <div>
        <Radio checked>家具・家電あり</Radio>
      </div>
      <div>
        <Radio>なし</Radio>
      </div>
    </div>
  )),
);
