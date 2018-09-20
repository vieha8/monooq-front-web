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
  .add('Footer', () => (
    <div>
      <Logo.Footer />
    </div>
  ))
  .add('NormalWhite', () => (
    <div>
      <Logo.BaseWhite />
    </div>
  ))
  .add('HeaderWhite', () => (
    <div>
      <Logo.HeaderWhite />
    </div>
  ));
