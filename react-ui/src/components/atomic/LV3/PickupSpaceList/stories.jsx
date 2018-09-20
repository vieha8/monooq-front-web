// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import PickupSpaceList from './index';

storiesOf('Organisms/PickupSpaceList', module)
  .addDecorator(StoryRouter())
  .add('Normal', () => (
    <div>
      <PickupSpaceList title="特徴でピックアップ" />
    </div>
  ));
