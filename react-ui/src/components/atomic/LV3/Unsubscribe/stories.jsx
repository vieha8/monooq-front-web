// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Unsubscribe from './index';
import Completed from './Completed';
import Failed from './Failed';

storiesOf('Organisms/Unsubscribe', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        退会理由フォーム
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Unsubscribe />
      </div>
    )),
  )
  .add(
    'Has Error',
    withInfo(`
        ### コンポーネント概要
        退会理由フォーム(入力エラー有りver)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Unsubscribe reasonTypeError="選択してください" />
      </div>
    )),
  )
  .add(
    'Completed',
    withInfo(`
        ### コンポーネント概要
        退会完了
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Completed />
      </div>
    )),
  )
  .add(
    'Failed',
    withInfo(`
        ### コンポーネント概要
        退会失敗
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Failed />
      </div>
    )),
  );
