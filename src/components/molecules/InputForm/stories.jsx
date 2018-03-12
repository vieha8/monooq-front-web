// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import InputFormMock from './mock/InputForm';

storiesOf('Molecules/InputForm', module)
  .add('Hint', () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <InputFormMock
        label="エリアや特徴がわかるタイトルをつけましょう"
        hint="全角40文字まで"
        placeholder="例）六本木駅チカで便利です。"
      />
    </div>
  ))
  .add('Unit', () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <InputFormMock
        label="お見積もり料金"
        placeholder="金額を入力してください。"
        unit="円"
      />
    </div>
  ));
