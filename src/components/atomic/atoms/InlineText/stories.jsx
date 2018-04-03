// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Inline from './index';

storiesOf('Atoms/Text/InlineText', module)
  .add('Base', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <Inline.Base>通常の文字列</Inline.Base>
    </div>
  ))
  .add('Strong', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <Inline.Strong>強調したい文字列</Inline.Strong>
    </div>
  ))
  .add('Bold', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      一部だけ<Inline.Bold>太字にしたい</Inline.Bold>ときに
    </div>
  ))
  .add('Del', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      一部だけ<Inline.Del>取り消ししたい</Inline.Del>ときに
    </div>
  ))
  .add('Ins', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      一部だけ<Inline.Ins>下線引きたい</Inline.Ins>ときに
    </div>
  ))
  .add('Small', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <Inline.Small>レイアウト的に小さくする場合</Inline.Small>
    </div>
  ))
  .add('Emphasis', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <Inline.Emphasis>重点として小さくする場合</Inline.Emphasis>
    </div>
  ))
  .add('SingleLine', () => (
    <div style={{ width: '100%', maxWidth: '100px' }}>
      <Inline.Base singleLine>
        1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット1行カット
      </Inline.Base>
    </div>
  ));
