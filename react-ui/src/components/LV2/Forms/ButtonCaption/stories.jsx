import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ButtonCaption from './index';

ButtonCaption.displayName = 'ButtonCaption';

storiesOf('Molecules(LV2)/Forms/ButtonCaption', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    キャプション付きボタン
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ButtonCaption caption="60秒で簡単登録" text="保管スペースを探す" />
    </div>
  )),
);
