// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import SlideImage from './index';

storiesOf('Atoms/SlideImage', module).add('Normal', () => (
  <div style={{ width: '100%' }}>
    <SlideImage
      images={[
        {
          original: 'http://placehold.jp/200x100.png',
          thumbnail: 'http://placehold.jp/200x100.png',
        },
        {
          original: 'http://placehold.jp/200x100.png',
          thumbnail: 'http://placehold.jp/200x100.png',
        },
        {
          original: 'http://placehold.jp/200x100.png',
          thumbnail: 'http://placehold.jp/200x100.png',
        },
        {
          original: 'http://placehold.jp/200x100.png',
          thumbnail: 'http://placehold.jp/200x100.png',
        },
        {
          original: 'http://placehold.jp/200x100.png',
          thumbnail: 'http://placehold.jp/200x100.png',
        },
      ]}
    />
  </div>
));
