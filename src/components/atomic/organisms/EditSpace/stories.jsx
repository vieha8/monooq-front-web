// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import Information from './Information';
import Baggage from './Baggage';
import Receive from './Receive';
import Size from './Size';
import InputPriceAll from './InputPriceAll';
import InputPriceType from './InputPriceType';

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
  ))
  .add('Size', () => (
    <div>
      <Size />
    </div>
  ))
  .add('InputPriceAll', () => (
    <div>
      <InputPriceAll />
    </div>
  ))
  .add('InputPriceType', () => (
    <div>
      <InputPriceType />
    </div>
  ));
