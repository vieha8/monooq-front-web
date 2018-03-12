// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import MenuItem from './index';

storiesOf('Molecules/MenuItem', module)
  .add('Normal', () => (
    <div style={{ width: '320px' }}>
      <MenuItem
        href="#"
        title="メッセージ"
        notificationCount={10}
      />
    </div>
  ));
