// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import Header from './Header';
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

storiesOf('Molecules/Space', module)
  .addDecorator(StoryRouter())
  .add('Header', () => (
    <div>
      <Header
        pref="東京都"
        city="杉並区"
        town="高円寺"
        name="テストテストテストテストテストテスト"
      />
    </div>
  ))
  .add('Attribute', () => (
    <div>
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
  ))
  .add('Address', () => (
    <div>
      <Address content="東京都杉並区高円寺" />
    </div>
  ))
  .add('Image', () => (
    <div>
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
  ))
  .add('Type', () => (
    <div>
      <Type content="東京都杉並区高円寺" />
    </div>
  ))
  .add('AboutBaggage', () => (
    <div>
      <AboutBaggage furniture content="東京都杉並区高円寺" />
    </div>
  ))
  .add('Receive', () => (
    <div>
      <Receive delivery meeting />
    </div>
  ))
  .add('Supplement', () => (
    <div>
      <Supplement content="受け取りは日曜日にお願いします" />
    </div>
  ))
  .add('HostInfo', () => (
    <div>
      <HostInfo
        id={100}
        name="ものおくほすと"
        profile="よろしくお願いします！"
        imageUrl="http://placehold.jp/500x500.png"
      />
    </div>
  ))
  .add('PriceHead', () => (
    <div>
      <PriceHead />
    </div>
  ))
  .add('Price', () => (
    <div>
      <Price full price="¥40,000" />
      <Price half price="¥20,000" />
      <Price quarter price="¥10,000" />
    </div>
  ))
  .add('SendMessage', () => (
    <div>
      <SendMessage onClick={() => console.log('onClick')} />
      <SendMessage loading onClick={() => console.log('onClick')} />
    </div>
  ));
