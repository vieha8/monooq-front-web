// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import EditProfile from './index';
import Completed from './Completed';

storiesOf('Organisms/EditProfile', module)
  .addDecorator(StorybookRouter())
  .add('Normal', () => (
    <div>
      <EditProfile />
    </div>
  ))
  .add('Completed', () => (
    <div>
      <Completed />
    </div>
  ));
