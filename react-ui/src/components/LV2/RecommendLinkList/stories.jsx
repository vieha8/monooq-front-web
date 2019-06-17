// @flow

import React from 'react';
import Path from 'config/path';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import RecommendLinkList from './index';

RecommendLinkList.displayName = 'RecommendLinkList';

storiesOf('Molecules(LV2)/RecommendLinkList', module)
  .addDecorator(StorybookRouter())
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      リンクリスト
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <RecommendLinkList
          Text="参考のリンク"
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
