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
  ))
  .add('Custom Height', () => (
    <Fragment>
      <Button height={20}>Height 20</Button>
      <br />
      <Button height={40}>Height 40</Button>
      <br />
      <Button height={60}>Height 60</Button>
    </Fragment>
  ));
