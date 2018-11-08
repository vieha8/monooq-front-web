// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ConfirmBtnModal from './index';

ConfirmBtnModal.displayName = 'ConfirmBtnModal';

storiesOf('Molecules(LV2)/ConfirmBtnModal', module).add(
  'Enabled',
  withInfo(`
      ### コンポーネント概要
      スペース削除ボタン
      - ・ボタン押下時、削除確認POPUPを表示。
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ConfirmBtnModal
        btnText={'削除する'}
        modalTitle={'スペース削除'}
        modalText={'登録済みのスペースを削除します。よろしいですか？'}
        onClickRemove={''}
      />
    </div>
  )),
);
