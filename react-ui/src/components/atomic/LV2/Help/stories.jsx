// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ListItem from './ListItem';
import HelpButton from './HelpButton';
import CommonHelp from './CommonHelp';

ListItem.displayName = 'ListItem';
HelpButton.displayName = 'HelpButton';
CommonHelp.displayName = 'CommonHelp';

storiesOf('Molecules/Help', module)
  .addDecorator(StoryRouter())
  .add(
    'HelpList Close',
    withInfo(`
      ### コンポーネント概要
      ヘルプリスト(CloseVer)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ListItem
          title="荷物を置く場所を探しています！モノオクの使い方を教えてください。"
          content="スペースによって立地や環境、広さや高さなどが異なるからです。あなたの荷物に対して最適な料金を見積もりできるように、ホストは料金の目安を提示しています。"
          onClick={() => console.log('onClick')}
          circleRight
        />
      </div>
    )),
  )
  .add(
    'HelpList Open',
    withInfo(`
      ### コンポーネント概要
      ヘルプリスト(OpenVer)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ListItem
          title="荷物を置く場所を探しています！モノオクの使い方を教えてください。"
          content="スペースによって立地や環境、広さや高さなどが異なるからです。あなたの荷物に対して最適な料金を見積もりできるように、ホストは料金の目安を提示しています。"
          onClick={() => console.log('onClick')}
          circleDown
          open
        />
      </div>
    )),
  )
  .add(
    'HelpButton',
    withInfo(`
      ### コンポーネント概要
      ヘルプボタン
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <HelpButton title="サービスについて" onClick={() => console.log('onClick')} />
      </div>
    )),
  )
  .add(
    'CommonHelp',
    withInfo(`
      ### コンポーネント概要
      ヘルプ共通部
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <CommonHelp
          headline="物置きスペースを利用したい方へ"
          buttons={[
            { title: 'サービスについて0', onClick: () => console.log('onClick1') },
            { title: 'サービスについて1', onClick: () => console.log('onClick2') },
            { title: 'サービスについて2', onClick: () => console.log('onClick3') },
            { title: 'サービスについて3', onClick: () => console.log('onClick4') },
          ]}
          helpTitle="スペースにはどれくらいのサイズ・量の荷物を置くことができますか？"
          helpLink="#"
        />
      </div>
    )),
  );
