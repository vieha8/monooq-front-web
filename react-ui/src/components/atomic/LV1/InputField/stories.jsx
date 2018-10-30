// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import InputField from './index';

InputField.displayName = 'InputField';

storiesOf('Atoms/Forms/InputField', module)
  .add(
    'Available',
    withInfo(`
      ### コンポーネント概要
      入力欄(通常ver)
    `)(() => (
      <div style={{ width: '300px' }}>
        <InputField />
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
      <div style={{ width: '300px' }}>
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
      <div style={{ width: '300px' }}>
        <InputField value="変更できません" disabled="disabled" />
      </div>
    )),
  );
