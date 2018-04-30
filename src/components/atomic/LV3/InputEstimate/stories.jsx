// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import InputEstimate from './index';

storiesOf('Organisms/InputEstimate', module)
  .addDecorator(StorybookRouter())
  .add('Normal', () => (
    <div>
      <InputEstimate />
    </div>
  ));
