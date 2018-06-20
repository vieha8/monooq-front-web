// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import PickupSpaceList from './index';

storiesOf('Organisms/PickupSpaceList', module).add('Normal', () => (
  <div>
    <PickupSpaceList title="特徴でピックアップ" />
  </div>
));
