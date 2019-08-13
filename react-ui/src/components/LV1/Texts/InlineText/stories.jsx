// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Inline from './index';

Inline.Base.displayName = 'Inline.Base';
Inline.Strong.displayName = 'Inline.Strong';
Inline.Bold.displayName = 'Inline.Bold';
Inline.Del.displayName = 'Inline.Del';
Inline.Ins.displayName = 'Inline.Ins';
Inline.Small.displayName = 'Inline.Small';
Inline.Tiny.displayName = 'Inline.Tiny';
Inline.EmphasisSmall.displayName = 'Inline.EmphasisSmall';
Inline.EmphasisTiny.displayName = 'Inline.EmphasisTiny';

storiesOf('Atoms(LV1)/Texts/InlineText', module)
  .add(
    'Base',
    withInfo(`
      ### コンポーネント概要
      インラインテキスト(通常ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <Inline.Base>通常の文字列</Inline.Base>
      </div>
    )),
  )
  .add(
    'Strong',
    withInfo(`
      ### コンポーネント概要
      インラインテキスト(強調ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <Inline.Strong>強調したい文字列</Inline.Strong>
      </div>
    )),
  )
  .add(
    'Bold',
    withInfo(`
      ### コンポーネント概要
      インラインテキスト(一部太字ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '380px', padding: `${Dimens.storyBookPadding}` }}>
        一部だけ
        <Inline.Bold>太字にしたい</Inline.Bold>
        ときに
      </div>
    )),
  )
  .add(
    'Del',
    withInfo(`
      ### コンポーネント概要
      インラインテキスト(一部取り消し線ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '380px', padding: `${Dimens.storyBookPadding}` }}>
        一部だけ
        <Inline.Del>取り消ししたい</Inline.Del>
        ときに
      </div>
    )),
  )
  .add(
    'Ins',
    withInfo(`
      ### コンポーネント概要
      インラインテキスト(一部下線ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '380px', padding: `${Dimens.storyBookPadding}` }}>
        一部だけ
        <Inline.Ins>下線引きたい</Inline.Ins>
        ときに
      </div>
    )),
  )
  .add(
    'Small',
    withInfo(`
      ### コンポーネント概要
      インラインテキスト(小文字ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <Inline.Small>レイアウト的に小さくする場合</Inline.Small>
      </div>
    )),
  )
  .add(
    'Tiny',
    withInfo(`
      ### コンポーネント概要
      インラインテキスト(最小文字ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <Inline.Tiny>最小の文字</Inline.Tiny>
      </div>
    )),
  )
  .add(
    'EmphasisSmall',
    withInfo(`
      ### コンポーネント概要
      インラインテキスト(重点として小さくするver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <Inline.EmphasisSmall>重点として小さくする場合</Inline.EmphasisSmall>
      </div>
    )),
  )
  .add(
    'SingleLine',
    withInfo(`
      ### コンポーネント概要
      インラインテキスト(文章途中カットver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '100px', padding: `${Dimens.storyBookPadding}` }}>
        <Inline.Base singleLine>
          1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット
        </Inline.Base>
      </div>
    )),
  );
