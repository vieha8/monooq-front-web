// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import InputPayment from './index';

storiesOf('Organisms/InputPayment', module)
  .addDecorator(StorybookRouter())
  .add('Normal', () => (
    <div>
      <InputPayment />
    </div>
  ))
  .add('Error', () => (
    <div>
      <InputPayment paidError />
    </div>
  ));
