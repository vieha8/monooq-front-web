// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Select from './index';

storiesOf('Atoms/Select', module)
  .add('Normal', () => (
    <div style={{ width: '140px' }}>
      <Select>
        <option>東京</option>
        <option>大阪</option>
        <option>福岡</option>
      </Select>
    </div>
  ));
