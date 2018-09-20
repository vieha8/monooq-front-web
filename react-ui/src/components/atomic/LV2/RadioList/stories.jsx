// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import RadioListMock from './mock/RadioList';

storiesOf('Molecules/RadioList', module).add('Normal', () => (
  <div>
    <RadioListMock />
  </div>
));
