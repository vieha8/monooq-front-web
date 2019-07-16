// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Information from './Information';
import Baggage from './Baggage';
import Receive from './Receive';
import InputPriceType from './InputPriceType';
import Completion from './Completion';

Information.displayName = 'Information';
Baggage.displayName = 'Baggage';
Receive.displayName = 'Receive';
InputPriceType.displayName = 'InputPriceType';
Completion.displayName = 'Completion';

storiesOf('Organisms(LV3)/EditSpace', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Information',
    withInfo(`
        ### コンポーネント概要
        スペース新規登録フォーム(基本情報)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Information />
      </div>
    )),
  )
  .add(
    'Information edit',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(基本情報)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Information edit />
      </div>
    )),
  )
  .add(
    'Baggage',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(荷物の内容)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Baggage />
      </div>
    )),
  )
  .add(
    'Receive',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(荷物の受け取り)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Receive />
      </div>
    )),
  )
  .add(
    'InputPriceType',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(スペースの料金[スペース区分別])
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InputPriceType />
      </div>
    )),
  )
  .add(
    'Completion create',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(基本情報)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Completion story space={{}} />
      </div>
    )),
  )
  .add(
    'Completion edit',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(基本情報)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Completion edit story space={{}} />
      </div>
    )),
  );
