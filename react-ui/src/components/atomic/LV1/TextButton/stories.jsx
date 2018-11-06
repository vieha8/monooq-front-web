// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import TextButton from './index';

var Url = 'https://monooq.com';
TextButton.displayName = 'TextButton';

storiesOf('Atoms(LV1)/Buttons/TextButton', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    テキストリンク
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <div>
        <TextButton href={Url} onClick={console.log('Clicked')}>
          詳細を見る
        </TextButton>
      </div>
      <div>
        <TextButton href={Url} onClick={console.log('Clicked')} disabled>
          詳細を見る
        </TextButton>
      </div>
    </div>
  )),
);
