// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ButtonLineA from './index';

ButtonLineA.displayName = 'ButtonLineA';

storiesOf('Atoms(LV1)/Buttons/ButtonLineA', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    ボタン(LINE@)
    * ■パラメータ
    * reactGACategory：GAのカテゴリ
    * reactGAAction：GAのAction
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ButtonLineA
        reactGACategory="StoryBookDummy"
        reactGAAction="Push LINE Register Button"
        story
      />
    </div>
  )),
);
