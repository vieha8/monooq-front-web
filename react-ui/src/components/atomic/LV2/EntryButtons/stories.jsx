// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import EntryButtons from './index';

EntryButtons.displayName = 'EntryButtons';

storiesOf('Molecules(LV2)/EntryButtons', module)
  .add(
    'Enabled',
    withInfo(`
      ### コンポーネント概要
      「次へ」「戻る」ボタンセット(「次へ」ボタン活性ver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <EntryButtons
          backButton={{
            text: '戻る',
            onClick: () => console.log('戻る'),
          }}
          enabledButton={{
            text: '次へ',
            onClick: () => console.log('次へ'),
          }}
          disabledButton={{
            text: '次へ',
          }}
          enabled
        />
      </div>
    )),
  )
  .add(
    'Disabled',
    withInfo(`
      ### コンポーネント概要
      「次へ」「戻る」ボタンセット(「次へ」ボタン非活性ver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <EntryButtons
          backButton={{
            text: '戻る',
            onClick: () => console.log('戻る'),
          }}
          enabledButton={{
            text: '次へ',
            onClick: () => console.log('次へ'),
          }}
          disabledButton={{
            text: '次へ',
          }}
        />
      </div>
    )),
  );
