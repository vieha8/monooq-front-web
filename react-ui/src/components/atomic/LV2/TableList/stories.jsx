// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import TableList from './index';

TableList.displayName = 'TableList';

storiesOf('Molecules/TableList', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      テーブルリスト
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <TableList
        list={[
          {
            label: 'マイナスレビューの投稿',
            text: 'ホスト都合によるキャンセルにより自動的にマイナスレビューが付きます。',
          },
          { label: 'ユーザーによるレビュー', text: 'ユーザーからレビュー投稿があります。' },
        ]}
      />
    </div>
  )),
);
