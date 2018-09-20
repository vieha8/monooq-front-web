// @flow

import React from 'react';
import StorybookRouter from 'storybook-router';
import { storiesOf } from '@storybook/react';

import SpaceImagePicker from './index';

storiesOf('Molecules/SpaceImagePicker', module)
  .addDecorator(StorybookRouter())
  .add('Has not image', () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <SpaceImagePicker images={[]} />
    </div>
  ))
  .add('Has image', () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <SpaceImagePicker images={[{ name: 'ほげほげ', url: 'http://placehold.jp/500x500.png' }]} />
    </div>
  ));
