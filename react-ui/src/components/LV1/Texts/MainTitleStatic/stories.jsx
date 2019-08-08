// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import MainTitle from './index';

MainTitle.displayName = 'MainTitle';

storiesOf('Atoms(LV1)/Texts/MainTitleStatic', module).add(
  'Base',
  withInfo(`
    ### コンポーネント概要
    画面タイトル(静的画面向け)
  `)(() => (
    <div style={{ width: '100%', padding: `${Dimens.storyBookPadding}` }}>
      <MainTitle>荷物に対する保険</MainTitle>
    </div>
  )),
);
