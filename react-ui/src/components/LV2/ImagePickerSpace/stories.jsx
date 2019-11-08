import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ImagePickerSpace from './index';

ImagePickerSpace.displayName = 'ImagePickerSpace';

storiesOf('Molecules(LV2)/ImagePickerSpace', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Has not image',
    withInfo(`
      ### コンポーネント概要
      スペース画像ピッカー(画像未選択ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
        <ImagePickerSpace images={[]} />
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
        <ImagePickerSpace
          images={[{ name: 'ã�»ã�’ã�»ã�’', url: 'http://placehold.jp/500x500.png' }]}
        />
      </div>
    )),
  );
