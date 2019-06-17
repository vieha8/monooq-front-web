// @flow

import React from 'react';
import Path from 'config/path';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import LinkList from './index';

LinkList.displayName = 'LinkList';

storiesOf('Molecules(LV2)/LinkList', module).add(
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
);
