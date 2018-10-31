// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SlideImage from './index';

SlideImage.displayName = 'SlideImage';

storiesOf('Atoms/SlideImage', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      画像スライダー
    `)(() => (
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
  )),
);
