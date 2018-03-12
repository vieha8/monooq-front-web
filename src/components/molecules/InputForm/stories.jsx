// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import InputFormMock from './mock/InputForm';

storiesOf('Molecules/InputForm', module)
  .add('Normal', () => (
    <div style={{ width: '400px' }}>
      <InputFormMock />
    </div>
  ));
