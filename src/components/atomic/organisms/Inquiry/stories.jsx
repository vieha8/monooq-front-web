// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import Inquiry from './index';

storiesOf('Organisms/Inquiry', module)
  .addDecorator(StorybookRouter())
  .add('Normal', () => (
    <div>
      <Inquiry />
    </div>
  ));
