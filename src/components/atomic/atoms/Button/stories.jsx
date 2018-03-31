// @flow

import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import Button from './index';

storiesOf('Atoms/Buttons/Button', module)
  .add('Primary', () => (
    <Fragment>
      <Button primary>Primary</Button>
      <Button primary disabled>Primary</Button>
    </Fragment>
  ))
  .add('Secondary', () => (
    <Fragment>
      <Button secondary>Secondary</Button>
      <Button secondary disabled>Secondary</Button>
    </Fragment>
  ))
  .add('Tertiary', () => (
    <Fragment>
      <Button tertiary>Tertiary</Button>
      <Button tertiary disabled>Tertiary</Button>
    </Fragment>
  ))
  .add('Facebook', () => (
    <Fragment>
      <Button facebook>Facebook</Button>
      <Button facebook disabled>Facebook</Button>
    </Fragment>
  ));
