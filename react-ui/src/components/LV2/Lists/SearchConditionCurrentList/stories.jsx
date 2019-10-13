// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchConditionCurrentList from './index';

SearchConditionCurrentList.displayName = 'SearchConditionCurrentList';

storiesOf('Molecules(LV2)/Lists/SearchConditionCurrentList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      現状の検索条件リスト
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SearchConditionCurrentList
          SearchConditionCurrentList={[
            {
              title: '都道府県',
              value: '東京都',
            },
            {
              title: '市区町村',
              value: '上原,恵比寿,神山町,笹塚,松濤,神宮前,神泉町,千駄ヶ谷',
            },
            {
              title: '町域・エリア',
              value: '',
            },
          ]}
        />
      </div>
    )),
  );
