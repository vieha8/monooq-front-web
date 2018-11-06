// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Information from './Information';
import Baggage from './Baggage';
import Receive from './Receive';
import Size from './Size';
import InputPriceAll from './InputPriceAll';
import InputPriceType from './InputPriceType';
import Completion from './Completion';

Information.displayName = 'Information';
Baggage.displayName = 'Baggage';
Receive.displayName = 'Receive';
Size.displayName = 'Size';
InputPriceAll.displayName = 'InputPriceAll';
InputPriceType.displayName = 'InputPriceType';
Completion.displayName = 'Completion';

storiesOf('Organisms(LV3)/EditSpace', module)
  .addDecorator(StoryRouter())
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
    'Size',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(スペースの大きさ)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Size />
      </div>
    )),
  )
  .add(
    'InputPriceAll',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(スペースの料金[スペースまるごと])
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InputPriceAll />
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
        <Completion space={{}} />
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
        <Completion edit space={{}} />
      </div>
    )),
  );
