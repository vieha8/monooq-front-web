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
    'Estimate Host',
    withInfo(`
      ### コンポーネント概要
      メッセージ(見積もり)(ホスト)(支払方法:未選択)(支払ステータス:支払い待ち)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Estimate
          id="10"
          name="YUKI HASHIDA"
          beginAt="2019/07/16 11:39:21"
          endAt="2019/07/16 12:39:21"
          price="24000"
          host
          status="estimate"
          paymentLink="#"
          receivedAt="2019/07/16 13:39:21"
          payType={0}
          econtextUrl="#"
        />
      </div>
    )),
  )
  .add(
    'Estimate No Paid',
    withInfo(`
      ### コンポーネント概要
      メッセージ(見積もり)(ゲスト)(支払方法:未選択)(支払ステータス:支払い待ち)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Estimate
          id="10"
          name="YUKI HASHIDA"
          beginAt="2019/07/16 11:39:21"
          endAt="2019/07/16 12:39:21"
          price="24000"
          host={false}
          status="estimate"
          paymentLink="#"
          receivedAt="2019/07/16 13:39:21"
          payType={0}
          econtextUrl="#"
        />
      </div>
    )),
  )
  .add(
    'Estimate Paid CreditCard',
    withInfo(`
      ### コンポーネント概要
      メッセージ(見積もり)(ゲスト)(支払方法:クレジットカード)(支払ステータス:支払完了)
      status：estimate、waiting、paid
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Estimate
          id="10"
          name="YUKI HASHIDA"
          beginAt="2019/07/16 11:39:21"
          endAt="2019/07/16 12:39:21"
          price="24000"
          host={false}
          status="paid"
          paymentLink="#"
          receivedAt="2019/07/16 13:39:21"
          payType={1}
          econtextUrl="#"
        />
      </div>
    )),
  )
  .add(
    'Estimate Paid Bank',
    withInfo(`
      ### コンポーネント概要
      メッセージ(見積もり)(ゲスト)(支払い方法:銀行振込)(支払ステータス:支払完了)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Estimate
          id="10"
          name="YUKI HASHIDA"
          beginAt="2019/07/16 11:39:21"
          endAt="2019/07/16 12:39:21"
          price="24000"
          host={false}
          status="paid"
          paymentLink="#"
          receivedAt="2019/07/16 13:39:21"
          payType={2}
          econtextUrl="#"
        />
      </div>
    )),
  )
  .add(
    'Estimate Paid Econtext',
    withInfo(`
      ### コンポーネント概要
      メッセージ(見積もり)(ゲスト)(支払い方法:イーコンテキスト)(支払ステータス:支払完了)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Estimate
          id="10"
          name="YUKI HASHIDA"
          beginAt="2019/07/16 11:39:21"
          endAt="2019/07/16 12:39:21"
          price="24000"
          host={false}
          status="paid"
          paymentLink="#"
          receivedAt="2019/07/16 13:39:21"
          payType={4}
          econtextUrl="https://google.com"
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
