// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchInput from './index';

SearchInput.displayName = 'SearchInput';

storiesOf('Molecules(LV2)/SearchInput', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      検索条件入力欄(検索ボタン活性ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
        <SearchInput
          onRef={() => {}}
          onClickSearchButton={() => console.log('onClickSearchButton')}
        />
      </div>
    )),
  )
  .add(
    'Disabled',
    withInfo(`
      ### コンポーネント概要
      検索条件入力欄(検索ボタン非活性ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
        <SearchInput onRef={() => {}} searchDisabled />
      </div>
    )),
  );
