import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Tag from './index';

Tag.displayName = 'Tag';

storiesOf('Atoms(LV1)/Texts/Tag', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      灰色背景の文字コンテンツ（スペース登録・編集完了画面で使用）
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <Tag tagList={['4畳以上', '1階', 'ダンボール1箱〜']} />
    </div>
  )),
);
