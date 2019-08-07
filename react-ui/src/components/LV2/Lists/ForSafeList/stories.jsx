// @flow

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ForSafeList from './index';

ForSafeList.displayName = 'ForSafeList';

const list = [
  {
    iconClass: 'far fa-heart',
    title: 'はじめての方へ',
    description:
      'まずは自分に合う物置きスペースを探し、メッセージで荷物を置かせてもらえるかホストに相談をします。サービスの使い方がよくわからない、お困りの方はこちら。',
    buttonText: '使い方について',
  },
  {
    iconClass: 'far fa-bookmark',
    title: '荷物に対する保険',
    description:
      'サービス内の記録であなたの荷物だと証明できる荷物には最大10万円までの補償があります。あなたがホストの時に、もし誰かの荷物を破損・紛失してしまっても同じ補償が受けられるので安心です。',
    buttonText: '保険について',
  },
  {
    iconClass: 'far fa-handshake',
    title: 'ルールとマナー',
    description:
      'モノオクは個人間の物置きシェアサービスです。トラブルや揉め事がないようにルールを設けています。みんなが安心して使えるようにマナーを大切にしましょう。',
    buttonText: 'ルールとマナーについて',
  },
];

storiesOf('Molecules(LV2)/Lists/ForSafeList', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      安心シェアsection
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ForSafeList list={list} />
    </div>
  )),
);
