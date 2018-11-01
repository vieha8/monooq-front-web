// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import InputFormMock from './mock/InputForm';
import Confirm from './confirm';

InputFormMock.displayName = 'InputFormMock';
Confirm.displayName = 'Confirm';

storiesOf('Molecules/InputForm', module)
  .add(
    'Hint',
    withInfo(`
      ### コンポーネント概要
      フォーム入力項目(Hint有りver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
        <InputFormMock
          label="特徴がわかるタイトルをつけましょう"
          hint="全角40文字まで"
          placeholder="例）六本木駅チカで便利です。"
        />
      </div>
    )),
  )
  .add(
    'Unit',
    withInfo(`
      ### コンポーネント概要
      フォーム入力項目(Unit対応ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
        <InputFormMock label="お見積もり料金" placeholder="金額を入力してください。" unit="円" />
      </div>
    )),
  )
  .add(
    'Confirm',
    withInfo(`
      ### コンポーネント概要
      フォーム入力項目(Confirm)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Confirm label="銀行名" value="モノオク銀行" />
      </div>
    )),
  )
  .add(
    'Extension',
    withInfo(`
      ### コンポーネント概要
      フォーム入力項目(Extension)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InputFormMock label="銀行名" extension={<div>任意のコンポーネント</div>} />
      </div>
    )),
  )
  .add(
    'Multiline',
    withInfo(`
      ### コンポーネント概要
      フォーム入力項目(複数行対応ver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InputFormMock label="銀行名" multiline />
      </div>
    )),
  );
