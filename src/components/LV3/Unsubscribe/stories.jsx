import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Unsubscribe from './index';
import Completed from './Completed';
import Failed from './Failed';

storiesOf('Organisms(LV3)/Unsubscribe', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
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
