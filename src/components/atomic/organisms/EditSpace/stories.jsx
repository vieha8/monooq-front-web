// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import Information from './Information';
import Baggage from './Baggage';
import Receive from './Receive';

storiesOf('Organisms/EditSpace', module)
  .addDecorator(StorybookRouter())
  .add('Information', () => (
    <div>
      <Information />
    </div>
  ))
  .add('Information edit', () => (
    <div>
      <Information edit />
    </div>
  ))
  .add('Baggage', () => (
    <div>
      <Baggage />
    </div>
  ))
  .add('Receive', () => (
    <div>
      <Receive />
    </div>
  ));
