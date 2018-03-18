// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Logo from './index';

storiesOf('Atoms/Images/Logo', module)
  .add('Normal', () => (
    <div>
      <Logo.Base />
    </div>
  ))
  .add('Header', () => (
    <div>
      <Logo.Header />
    </div>
  ))
  .add('ColoredHeader', () => (
    <div>
      <Logo.ColoredHeader />
    </div>
  ))
  .add('Footer', () => (
    <div>
      <Logo.Footer />
    </div>
  ));
