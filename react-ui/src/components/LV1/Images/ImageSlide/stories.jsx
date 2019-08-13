// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ImageSlide from './index';

ImageSlide.displayName = 'ImageSlide';

storiesOf('Atoms(LV1)/Images/ImageSlide', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      画像スライダー
    `)(() => (
    <div style={{ width: '100%', maxWidth: '540px', padding: `${Dimens.storyBookPadding}` }}>
      <ImageSlide
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
