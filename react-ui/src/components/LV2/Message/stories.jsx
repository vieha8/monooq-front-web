// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Other from './Other';
import MySelf from './MySelf';
import Admin from './Admin';
import Estimate from './Estimate';
import Photo from './Photo';
import Input from './Input';

Other.displayName = 'Other';
MySelf.displayName = 'MySelf';
Admin.displayName = 'Admin';
Estimate.displayName = 'Estimate';
Photo.displayName = 'Photo';
Input.displayName = 'Input';

storiesOf('Molecules(LV2)/Message', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Other',
    withInfo(`
      ### コンポーネント概要
      メッセージ(相手側の投稿)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Other
          imageSrc="http://placehold.jp/500x500.png"
          imageAlt="name"
          message="はじめまして！この度はご予約ありがとうございます！最後までよろしくお願いいたします！"
          receivedAt="2018/03/02 18:32"
        />
      </div>
    )),
  )
  .add(
    'MySelf no error',
    withInfo(`
      ### コンポーネント概要
      メッセージ(自分側の投稿)(エラー無しver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MySelf
          message="はじめてまして！引っ越しに伴い2ヶ月ほど荷物を預けたいです。大きめの荷物になりますがよろしくお願いします。3/20〜5/20頃までです！"
          sentAt="2018/03/03 20:10"
          onClickRetry={() => console.log('onClickRetry')}
        />
      </div>
    )),
  )
  .add(
    'MySelf has error',
    withInfo(`
      ### コンポーネント概要
      メッセージ(自分側の投稿)(エラー有りver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MySelf
          message="はじめてまして！引っ越しに伴い2ヶ月ほど荷物を預けたいです。大きめの荷物になりますがよろしくお願いします。3/20〜5/20頃までです！"
          sentAt="2018/03/03 20:10"
          onClickRetry={() => console.log('onClickRetry')}
          error
        />
      </div>
    )),
  )
  .add(
    'Admin',
    withInfo(`
      ### コンポーネント概要
      メッセージ(取引成立)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Admin
          message="取引成立です！あなたのお支払いが完了しました。荷物の準備を開始しましょう！"
          receivedAt="2018/03/03 20:10"
          link={{
            text: 'リンクテキスト',
            url: '#',
          }}
        />
      </div>
    )),
  )
  .add(
    'Estimate',
    withInfo(`
      ### コンポーネント概要
      メッセージ(見積もり)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Estimate
          name="YUKI HASHIDA"
          beginAt={new Date()}
          endAt={new Date()}
          price="24,000円"
          paymentLink="#"
          receivedAt="2018/03/02 10:52"
        />
      </div>
    )),
  )
  .add(
    'Photo',
    withInfo(`
      ### コンポーネント概要
      メッセージ(画像)
    `)(() => (
      <div style={{ width: '300px', padding: `${Dimens.storyBookPadding}` }}>
        <Photo src="http://placehold.jp/500x500.png" alt="photo" receivedAt="2018/03/02 10:52" />
      </div>
    )),
  )
  .add(
    'Input',
    withInfo(`
      ### コンポーネント概要
      メッセージ入力欄(画像添付機能付き)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Input
          onClickPickImage={() => console.log('onClickPickImage')}
          value={'test input'}
          onChange={() => console.log('onChange')}
        />
      </div>
    )),
  );
