// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Select from './index';

Select.displayName = 'Select';

storiesOf('Atoms/Forms/Select', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    セレクトボックス
  `)(() => (
    <div style={{ width: '140px' }}>
      <Select>
        <option>東京</option>
        <option>大阪</option>
        <option>福岡</option>
      </Select>
    </div>
  )),
);
