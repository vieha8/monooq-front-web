import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ButtonModalConfirmRemove from './index';

ButtonModalConfirmRemove.displayName = 'ButtonModalConfirmRemove';

storiesOf('Molecules(LV2)/Forms/ButtonModalConfirmRemove', module).add(
  'Enabled',
  withInfo(`
      ### コンポーネント概要
      スペース削除ボタン
      - ・ボタン押下時、削除確認POPUPを表示。
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ButtonModalConfirmRemove onClickRemove={() => console.log('onClick')} />
    </div>
  )),
);
