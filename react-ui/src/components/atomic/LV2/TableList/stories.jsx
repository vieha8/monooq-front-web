// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import TableList from './index';

storiesOf('Molecules/TableList', module).add('Normal', () => (
  <div>
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
));
