// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import HostEntryStep from './index';

storiesOf('Molecules/HostEntryStep', module)
  .add('Step 0', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <HostEntryStep step={0} />
    </div>
  ))
  .add('Step 1', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <HostEntryStep step={1} />
    </div>
  ))
  .add('Step 2', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <HostEntryStep step={2} />
    </div>
  ))
  .add('Step 3', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <HostEntryStep step={3} />
    </div>
  ));
