// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import InputField from './index';

InputField.displayName = 'InputField';

storiesOf('Atoms(LV1)/Forms/InputField', module)
  .add(
    'Available',
    withInfo(`
      ### コンポーネント概要
      入力欄(通常ver)
    `)(() => (
      <div style={{ Width: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <InputField />
      </div>
    )),
  )
  .add(
    'Available PlaceHolder',
    withInfo(`
      ### コンポーネント概要
      入力欄(PlaceHolder有りver)
    `)(() => (
      <div style={{ Width: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <InputField placeholder="メールアドレス" />
      </div>
    )),
  )
  .add(
    'Has Error',
    withInfo(`
      ### コンポーネント概要
      - ・入力欄(エラー有りver)
      - ・非活性になる。
    `)(() => (
      <div style={{ Width: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <InputField error value="入力してはいけない文字" />
      </div>
    )),
  )
  .add(
    'Disable',
    withInfo(`
      ### コンポーネント概要
      入力欄(非活性ver)
    `)(() => (
      <div style={{ Width: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <InputField value="変更できません" disabled="disabled" />
      </div>
    )),
  );
