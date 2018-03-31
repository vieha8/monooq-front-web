// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import Signup from './index';

storiesOf('Organisms/Signup', module)
  .addDecorator(StoryRouter())
  .add('Normal', () => (
    <Signup />
  ));
