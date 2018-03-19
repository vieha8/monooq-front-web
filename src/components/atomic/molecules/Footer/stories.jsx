// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import Footer from './index';

storiesOf('Molecules/Footer', module)
  .addDecorator(StoryRouter())
  .add('Normal', () => (
    <div style={{ paddingTop: '120px' }}>
      <Footer />
    </div>
  ));
