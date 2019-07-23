// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Attribute from './Attribute';
import Address from './Address';
import Image from './Image';
import Type from './Type';
import AboutBaggage from './AboutBaggage';
import Receive from './Receive';
import Supplement from './Supplement';
import HostInfo from './HostInfo';
import PriceHead from './PriceHead';
import Price from './Price';
import SendMessage from './SendMessage';

Attribute.displayName = 'Attribute';
Address.displayName = 'Address';
Image.displayName = 'Image';
Type.displayName = 'Type';
AboutBaggage.displayName = 'AboutBaggage';
Receive.displayName = 'Receive';
Supplement.displayName = 'Supplement';
HostInfo.displayName = 'HostInfo';
PriceHead.displayName = 'PriceHead';
Price.displayName = 'Price';
SendMessage.displayName = 'SendMessage';

storiesOf('Molecules(LV2)/Space', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Attribute',
    withInfo(`
      ### コンポーネント概要
      スペース情報(各項)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Attribute
          title="タイトル"
          content={
            <div>
              <div>内容1</div>
              <div>内容2</div>
            </div>
          }
        />
        <Attribute
          title="タイトル"
          content={
            <div>
              <div>内容1</div>
              <div>内容2</div>
            </div>
          }
        />
        <Attribute
          title="タイトル"
          content={
            <div>
              <div>内容1</div>
              <div>内容2</div>
            </div>
          }
        />
      </div>
    )),
  )
  .add(
    'Address',
    withInfo(`
      ### コンポーネント概要
      スペース情報(所在地)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Address content="東京都渋谷区渋谷" />
      </div>
    )),
  )
  .add(
    'Image',
    withInfo(`
      ### コンポーネント概要
      スペース情報(スペース画像)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Image
          images={[
            {
              original: 'http://placehold.jp/200x100.png',
              thumbnail: 'http://placehold.jp/200x100.png',
            },
            {
              original: 'http://placehold.jp/200x100.png',
              thumbnail: 'http://placehold.jp/200x100.png',
            },
            {
              original: 'http://placehold.jp/200x100.png',
              thumbnail: 'http://placehold.jp/200x100.png',
            },
            {
              original: 'http://placehold.jp/200x100.png',
              thumbnail: 'http://placehold.jp/200x100.png',
            },
            {
              original: 'http://placehold.jp/200x100.png',
              thumbnail: 'http://placehold.jp/200x100.png',
            },
          ]}
          description="これは説明です"
        />
      </div>
    )),
  )
  .add(
    'Type',
    withInfo(`
      ### コンポーネント概要
      スペース情報(種類)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Type content="東京都渋谷区渋谷" />
      </div>
    )),
  )
  .add(
    'AboutBaggage',
    withInfo(`
      ### コンポーネント概要
      スペース情報(スペースに置ける荷物)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <AboutBaggage furniture content="東京都渋谷区渋谷" />
      </div>
    )),
  )
  .add(
    'Receive',
    withInfo(`
      ### コンポーネント概要
      スペース情報(受取り方法)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Receive delivery meeting />
      </div>
    )),
  )
  .add(
    'Supplement',
    withInfo(`
      ### コンポーネント概要
      スペース情報(受取りについて補足)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Supplement content="受け取りは日曜日にお願いします" />
      </div>
    )),
  )
  .add(
    'HostInfo',
    withInfo(`
      ### コンポーネント概要
      スペース情報(ホストの情報)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <HostInfo
          id={100}
          name="ものおくほすと"
          profile="よろしくお願いします！"
          imageUrl="http://placehold.jp/500x500.png"
        />
      </div>
    )),
  )
  .add(
    'PriceHead',
    withInfo(`
      ### コンポーネント概要
      スペース情報(料金目安のヘッダ)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PriceHead />
      </div>
    )),
  )
  .add(
    'Price',
    withInfo(`
      ### コンポーネント概要
      スペース情報(料金)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Price full price="¥40,000" />
        <Price half price="¥20,000" />
        <Price quarter price="¥10,000" />
      </div>
    )),
  )
  .add(
    'SendMessage',
    withInfo(`
      ### コンポーネント概要
      相談するボタン
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SendMessage onClick={() => console.log('onClick')} />
        <br />
        <SendMessage loading onClick={() => console.log('onClick')} />
      </div>
    )),
  );
