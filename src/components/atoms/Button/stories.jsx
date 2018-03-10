// @flow

import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import Button from './index';

storiesOf('Atoms/Buttons/Button', module)
  .add('Primary', () => (
    <Fragment>
      <Button.Primary>Primary</Button.Primary>
      <Button.Primary disabled>Primary</Button.Primary>
    </Fragment>
  ))
  .add('Secondary', () => (
    <Fragment>
      <Button.Secondary>Secondary</Button.Secondary>
      <Button.Secondary disabled>Secondary</Button.Secondary>
    </Fragment>
  ))
  .add('Tertiary', () => (
    <Fragment>
      <Button.Tertiary>Tertiary</Button.Tertiary>
      <Button.Tertiary disabled>Tertiary</Button.Tertiary>
    </Fragment>
  ));
