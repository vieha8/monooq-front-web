// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import AreaPinList from './index';

AreaPinList.displayName = 'AreaPinList';

storiesOf('Molecules(LV2)/Lists/AreaPinList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      ボタンリスト(エリアボタンPin付き)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <AreaPinList
          caption="人気エリアで探す"
          areaPinList={[
            {
              name: '武蔵村山市',
              link: '/musashimurayama',
            },
            {
              name: '渋谷区',
              link: '/shibuya',
            },
            {
              name: '北区',
              link: '/kita',
            },
            {
              name: '武蔵村山市',
              link: '/musashimurayama',
            },
            {
              name: '渋谷区',
              link: '/shibuya',
            },
            {
              name: '北区',
              link: '/kita',
            },
            {
              name: '武蔵村山市',
              link: '/musashimurayama',
            },
            {
              name: '渋谷区',
              link: '/shibuya',
            },
            {
              name: '北区',
              link: '/kita',
            },
            {
              name: '武蔵村山市',
              link: '/musashimurayama',
            },
            {
              name: '渋谷区',
              link: '/shibuya',
            },
            {
              name: '北区',
              link: '/kita',
            },
            {
              name: '武蔵村山市',
              link: '/musashimurayama',
            },
            {
              name: '渋谷区',
              link: '/shibuya',
            },
            {
              name: '北区',
              link: '/kita',
            },
          ]}
        />
      </div>
    )),
  );
