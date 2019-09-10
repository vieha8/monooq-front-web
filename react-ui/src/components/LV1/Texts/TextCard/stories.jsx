// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import TextCard from './index';

TextCard.displayName = 'TextCard';

storiesOf('Atoms(LV1)/Texts/TextCard', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      灰色背景の文字コンテンツ（スペース登録・編集完了画面で使用）
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <TextCard data="リクエストが届いてから24時間以内に返信しましょう。 早めに返信した方が、成約率が高くなります！" />
    </div>
  )),
);
