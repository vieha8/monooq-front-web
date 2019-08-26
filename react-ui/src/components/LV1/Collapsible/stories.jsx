// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Collapsible from './index';
import NoCollapsible from './NoCollapsible';

Collapsible.displayName = 'Collapsible';
NoCollapsible.displayName = 'NoCollapsible';

const contents = [
  {
    Name: '関東',
    Prefectures: [
      { ID: 13, Name: '東京都', Spaces: [{ ID: 1 }] },
      { ID: 14, Name: '神奈川県', Spaces: [{ ID: 1 }, { ID: 2 }] },
      { ID: 8, Name: '茨城県', Spaces: [{ ID: 1 }, { ID: 2 }, { ID: 3 }] },
      { ID: 9, Name: '栃木県', Spaces: [{ ID: 1 }] },
      { ID: 10, Name: '群馬県', Spaces: [{ ID: 1 }] },
      { ID: 11, Name: '埼玉県', Spaces: [{ ID: 1 }] },
      { ID: 12, Name: '千葉県', Spaces: [{ ID: 1 }] },
    ],
  },
  {
    Name: '近畿',
    Prefectures: [
      { ID: 4, Name: '三重県', Spaces: [{ ID: 1 }] },
      { ID: 25, Name: '滋賀県', Spaces: [{ ID: 1 }, { ID: 2 }] },
    ],
  },
  {
    Name: '九州・沖縄',
    Prefectures: [
      { ID: 6, Name: '福岡県', Spaces: [{ ID: 1 }] },
      { ID: 41, Name: '佐賀県', Spaces: [{ ID: 1 }, { ID: 2 }] },
      { ID: 42, Name: '長崎県', Spaces: [{ ID: 1 }] },
    ],
  },
];

storiesOf('Atoms(LV1)/Collapsible', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Collapsible',
    withInfo(`
        ### コンポーネント概要
        アコーディオンコンポーネント
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Collapsible key="key1" title="地域から探す" contents={contents} />
      </div>
    )),
  )
  .add(
    'No Collapsible',
    withInfo(`
        ### コンポーネント概要
        非アコーディオンコンポーネント(折りたたみ不可)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <NoCollapsible key="key1" title="関東から探す" contents={contents} />
      </div>
    )),
  );
