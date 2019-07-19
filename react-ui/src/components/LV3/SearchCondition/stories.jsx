// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchCondition from './index';

SearchCondition.displayName = 'SearchCondition';

storiesOf('Organisms(LV3)/SearchCondition', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        スペース検索条件入力画面
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SearchCondition onClickSearch={console.log('Clicked')} />
      </div>
    )),
  );
