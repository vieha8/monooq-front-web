// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Loading from './index';

storiesOf('Atoms/Util/Loading', module).add('Normal', () => (
  <div>
    <Loading size="mini" />
    <Loading size="medium" />
    <Loading size="large" />
  </div>
));
