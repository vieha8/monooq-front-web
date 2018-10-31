// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import TextButton from './index';

var Url = 'https://monooq.com';
TextButton.displayName = 'TextButton';

storiesOf('Atoms/Buttons/TextButton', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    テキストリンク
  `)(() => (
    <div>
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
