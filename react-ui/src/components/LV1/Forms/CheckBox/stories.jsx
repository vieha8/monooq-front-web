// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import CheckBox from './index';

CheckBox.displayName = 'CheckBox';

storiesOf('Atoms(LV1)/Forms/CheckBox', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      チェックボックス
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <CheckBox checked>タンス</CheckBox>
      <br />
      <CheckBox>本棚</CheckBox>
      <br />
      <CheckBox checked>クローゼット</CheckBox>
    </div>
  )),
);
