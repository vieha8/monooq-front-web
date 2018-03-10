// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import InputField from './index';

storiesOf('Atoms/Forms/InputField', module)
  .add('Available', () => (
    <div style={{ width: '300px' }}>
      <InputField />
    </div>
  ))
  .add('Has Error', () => (
    <div style={{ width: '300px' }}>
      <InputField error value="入力してはいけない文字" />
    </div>
  ))
  .add('Disable', () => (
    <div style={{ width: '300px' }}>
      <InputField value="変更できません" disabled="disabled" />
    </div>
  ));
