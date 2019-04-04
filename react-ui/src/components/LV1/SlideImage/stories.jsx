// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SlideImage from './index';

SlideImage.displayName = 'SlideImage';

storiesOf('Atoms(LV1)/SlideImage', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      画像スライダー
    `)(() => (
    <div style={{ width: '100%', padding: `${Dimens.storyBookPadding}` }}>
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
