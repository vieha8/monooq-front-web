// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ButtonEntry from './index';

ButtonEntry.displayName = 'ButtonEntry';

storiesOf('Molecules(LV2)/Forms/ButtonEntry', module)
  .add(
    'Enabled',
    withInfo(`
      ### コンポーネント概要
      「次へ」「戻る」ボタンセット(「次へ」ボタン活性ver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ButtonEntry
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
        <ButtonEntry
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
