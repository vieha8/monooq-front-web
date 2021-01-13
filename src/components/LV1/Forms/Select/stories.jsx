import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Select from './index';

Select.displayName = 'Select';

storiesOf('Atoms(LV1)/Forms/Select', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    セレクトボックス
  `)(() => (
    <div style={{ width: '220px', padding: `${Dimens.storyBookPadding}` }}>
      <Select>
        <option>東京</option>
        <option>大阪</option>
        <option>福岡</option>
      </Select>
    </div>
  )),
);
