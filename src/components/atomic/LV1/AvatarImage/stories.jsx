// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import AvatarImage from './index';

storiesOf('Atoms/Images/AvaterImage', module).add('Normal', () => (
  <div>
    <div style={{ marginLeft: '32px', display: 'inline-block', verticalAlign: 'top' }}>
      <AvatarImage size={92} src="http://placehold.jp/500x500.png" alt="name" />
    </div>
    <div style={{ marginLeft: '32px', display: 'inline-block', verticalAlign: 'top' }}>
      <AvatarImage size={64} src="http://placehold.jp/500x500.png" alt="name" />
    </div>
    <div style={{ marginLeft: '32px', display: 'inline-block', verticalAlign: 'top' }}>
      <AvatarImage size={32} src="http://placehold.jp/500x500.png" alt="name" />
    </div>
  </div>
));
