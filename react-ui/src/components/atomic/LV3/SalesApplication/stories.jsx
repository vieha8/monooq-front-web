// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import SalesApplication from './index';

storiesOf('Organisms/SalesApplication', module)
  .addDecorator(StoryRouter())
  .add('Normal', () => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <SalesApplication sales={[]} transfer={[]} />
    </div>
  ));
