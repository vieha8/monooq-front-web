// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import NotificationCount from './index';

storiesOf('Atoms/Util/NotificationCount', module)
  .add('Normal', () => (
    <NotificationCount
      count={10}
    />
  ));
