// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchNotFound from './index';

SearchNotFound.displayName = 'SearchNotFound';

storiesOf('Organisms/SearchNotFound', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        検索結果無し
      `)(() => (
      <div style={{ width: '100%', maxWidth: '1200px', padding: `${Dimens.storyBookPadding}` }}>
        <SearchNotFound
          locationText="東京都渋谷区"
          onChangeLocation={() => console.log('onChangeLocation')}
          onClickSearchButton={() => console.log('onClickSearchButton')}
          onKeyDownSearchField={() => console.log('onKeyDownSearchField')}
        />
      </div>
    )),
  )
  .add(
    'Disabled',
    withInfo(`
        ### コンポーネント概要
        検索結果無し(検索ボタン非活性ver)
      `)(() => (
      <div style={{ width: '100%', maxWidth: '1200px', padding: `${Dimens.storyBookPadding}` }}>
        <SearchNotFound
          locationText=""
          onChangeLocation={() => console.log('onChangeLocation')}
          onClickSearchButton={() => console.log('onClickSearchButton')}
          onKeyDownSearchField={() => console.log('onKeyDownSearchField')}
        />
      </div>
    )),
  );
