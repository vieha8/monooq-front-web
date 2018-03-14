// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Save from './index';

storiesOf('Molecules/Save', module)
  .add('Enabled', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <Save
        onClickSave={() => console.log('onClickSave')}
      />
    </div>
  ))
  .add('Disabled', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <Save
        onClickSave={() => console.log('onClickSave')}
        disabled
      />
    </div>
  ));
