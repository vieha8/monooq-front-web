// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import CheckListMock from './mock/CheckList';

storiesOf('Molecules/CheckList', module)
  .add('Normal', () => (
    <div>
      <CheckListMock />
    </div>
  ));
