import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Text from './index';

Text.displayName = 'Text';

storiesOf('Atoms(LV1)/Texts/TextStatic', module).add(
  'Base',
  withInfo(`
    ### コンポーネント概要
    テキスト領域(静的画面向け)
  `)(() => (
    <div style={{ width: '100%', padding: `${Dimens.storyBookPadding}` }}>
      <Text>取引やサービスについてのお問い合わせは電話では受け付けておりません。</Text>
    </div>
  )),
);
