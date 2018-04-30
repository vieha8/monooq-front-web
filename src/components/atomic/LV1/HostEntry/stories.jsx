// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import HostEntry from './index';

storiesOf('Atoms/Util/HostEntry', module).add('Normal', () => (
  <div>
    <HostEntry onClick={() => console.log('onClick HostEntry')} />
  </div>
));
