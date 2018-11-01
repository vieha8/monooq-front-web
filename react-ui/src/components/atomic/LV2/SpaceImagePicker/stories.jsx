// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SpaceImagePicker from './index';

SpaceImagePicker.displayName = 'SpaceImagePicker';

storiesOf('Molecules/SpaceImagePicker', module)
  .addDecorator(StoryRouter())
  .add(
    'Has not image',
    withInfo(`
      ### コンポーネント概要
      スペース画像ピッカー(画像未選択ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
        <SpaceImagePicker images={[]} />
      </div>
    )),
  )
  .add(
    'Has image',
    withInfo(`
      ### コンポーネント概要
      スペース画像ピッカー(画像選択済みver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
        <SpaceImagePicker
          images={[{ name: 'ã�»ã�’ã�»ã�’', url: 'http://placehold.jp/500x500.png' }]}
        />
      </div>
    )),
  );
