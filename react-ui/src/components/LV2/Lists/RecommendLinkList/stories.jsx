// @flow

import React from 'react';
import Path from 'config/path';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import RecommendLinkList from './index';

RecommendLinkList.displayName = 'RecommendLinkList';

storiesOf('Molecules(LV2)/Lists/RecommendLinkList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
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
