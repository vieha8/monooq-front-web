// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import Unsubscribe from './index';
import Completed from './Completed';
import Failed from './Failed';

storiesOf('Organisms/Unsubscribe', module)
  .addDecorator(StorybookRouter())
  .add('Normal', () => (
    <div>
      <Unsubscribe />
    </div>
  ))
  .add('Has Error', () => (
    <div>
      <Unsubscribe reasonTypeError="選択してください" />
    </div>
  ))
  .add('Completed', () => (
    <div>
      <Completed />
    </div>
  ))
  .add('Failed', () => (
    <div>
      <Failed />
    </div>
  ));
