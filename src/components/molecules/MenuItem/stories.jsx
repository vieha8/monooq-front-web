// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import ServiceMenu from './ServiceMenu';
import HelpMenu from './HelpMenu';

storiesOf('Molecules/MenuItem', module)
  .add('ServiceMenu', () => (
    <div style={{ width: '320px' }}>
      <ServiceMenu
        href="#"
        title="メッセージ"
        notificationCount={10}
      />
    </div>
  ))
  .add('HelpMenu', () => (
    <div style={{ width: '320px' }}>
      <HelpMenu
        onClick={() => console.log('onClick')}
        title="ナビゲーション"
        hasAngle
      />
      <HelpMenu
        onClick={() => console.log('onClick')}
        title="ナビゲーション"
        hasAngle
        open
      />
      <HelpMenu
        onClick={() => console.log('onClick')}
        title="サービスについて"
        fillColor
      />
    </div>
  ));
