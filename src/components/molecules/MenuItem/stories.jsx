// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import ServiceMenu from './ServiceMenu';

storiesOf('Molecules/MenuItem/ServiceMenu', module)
  .add('Normal', () => (
    <div style={{ width: '320px' }}>
      <ServiceMenu
        href="#"
        title="メッセージ"
        notificationCount={10}
      />
    </div>
  ));
