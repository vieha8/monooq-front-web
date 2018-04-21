// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import IconInputField from './index';

storiesOf('Molecules/IconInputField', module)
  .add('Email', () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <IconInputField iconClassName="fal fa-envelope" />
    </div>
  ))
  .add('Password', () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <IconInputField iconClassName="fal fa-unlock-alt" type="password" />
    </div>
  ));
