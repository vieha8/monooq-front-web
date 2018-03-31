// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import Login from './index';

storiesOf('Organisms/Login', module)
  .addDecorator(StoryRouter())
  .add('Normal', () => (
    <Login />
  ));
