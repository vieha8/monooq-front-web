// @flow

import React from 'react';
import Path from 'config/path';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens, Colors } from 'variables';

import LinkList from './index';

LinkList.displayName = 'LinkList';

storiesOf('Molecules(LV2)/Lists/LinkList', module)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      リンクリスト
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <LinkList
          list={[
            {
              text: 'トップページへ戻る',
              path: '/',
            },
            {
              text: 'ホストになる',
              path: Path.signUp(),
            },
            {
              text: 'はじめての方へ',
              path: Path.about(),
            },
            {
              text: 'よくある質問',
              path: 'https://help.monooq.com/',
              blank: '_blank',
            },
          ]}
        />
      </div>
    )),
  )
  .add(
    'Landscape',
    withInfo(`
      ### コンポーネント概要
      リンクリスト(横並びver)
      * ■パラメータ
      * text：リンク名
      * path：リンク先
      * current：カレントリンク(リンク非活性になる)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <LinkList
          list={[
            {
              text: '新着順',
              path: '/',
              current: true,
            },
            {
              text: 'おすすめ',
              path: Path.signUp(),
            },
            {
              text: '安い順',
              path: Path.about(),
            },
          ]}
          landscape
          color={Colors.brandPrimary}
        />
      </div>
    )),
  );
