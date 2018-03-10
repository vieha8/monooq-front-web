// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import HeroImage from './index';

storiesOf('Atoms/Images/HeroImage', module)
  .add('Normal', () => (
    <div>
      <div style={{ marginLeft: '32px', verticalAlign: 'top' }}>
        <HeroImage large src="http://placehold.jp/700x500.png" alt="name" />
      </div>
      <div style={{ marginLeft: '32px', verticalAlign: 'top' }}>
        <HeroImage medium src="http://placehold.jp/700x500.png" alt="name" />
      </div>
      <div style={{ marginLeft: '32px', verticalAlign: 'top' }}>
        <HeroImage small src="http://placehold.jp/700x500.png" alt="name" />
      </div>
    </div>
  ));
