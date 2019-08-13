// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import MainTitleContainer from './index';

MainTitleContainer.displayName = 'MainTitleContainer';

storiesOf('Molecules(LV2)/Texts/MainTitleStatic', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      画面タイトル(静的画面向け)(通常ver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MainTitleContainer mainTitle="キャンセルポリシー" />
      </div>
    )),
  )
  .add(
    'Sub Title',
    withInfo(`
      ### コンポーネント概要
      画面タイトル(静的画面向け)(サブタイトル有効ver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MainTitleContainer
          mainTitle="ごめんなさい！"
          mainTitleSub="お探しのページが見つかりません。"
        />
      </div>
    )),
  )
  .add(
    'Text',
    withInfo(`
      ### コンポーネント概要
      画面タイトル(静的画面向け)(テキスト有効ver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MainTitleContainer
          mainTitle="キャンセルポリシー"
          text="キャンセルポリシーとは、モノオクが定める取引成立後のキャンセルに発生する手数料やご注意事項です。見積もりを送る前・お支払いの前に必ずご確認ください。"
        />
      </div>
    )),
  )
  .add(
    'isHr',
    withInfo(`
      ### コンポーネント概要
      画面タイトル(静的画面向け)(仕切り線有効ver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MainTitleContainer
          mainTitle="キャンセルポリシー"
          text="キャンセルポリシーとは、モノオクが定める取引成立後のキャンセルに発生する手数料やご注意事項です。見積もりを送る前・お支払いの前に必ずご確認ください。"
          isHr
        />
      </div>
    )),
  )
  .add(
    'Sub Container',
    withInfo(`
      ### コンポーネント概要
      画面タイトル(静的画面向け)(画面タイトルのネスト利用ver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MainTitleContainer
          mainTitle="ホストのキャンセルについて"
          text="取引成立後にホスト都合のキャンセルがあると、ユーザーの予定が立たたなくなり、あなたにもサービスの信頼にも影響が出ます。スペースのキャンセルを行う場合は下記のペナルティが発生します。"
          sub
        />
      </div>
    )),
  );
