// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import EditProfile from './index';

storiesOf('Organisms/EditProfile', module)
  .addDecorator(StorybookRouter())
  .add('Normal', () => (
    <div>
      <EditProfile />
    </div>
  ));
