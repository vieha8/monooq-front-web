// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Other from './Other';
import MySelf from './MySelf';
import Admin from './Admin';
import Estimate from './Estimate';
import Photo from './Photo';

storiesOf('Molecules/Message', module)
  .add('Other', () => (
    <div>
      <Other
        imageSrc="http://placehold.jp/500x500.png"
        imageAlt="name"
        message="はじめまして！この度はご予約ありがとうございます！最後までよろしくお願いいたします！"
        receivedAt="2018/03/02 18:32"
      />
    </div>
  ))
  .add('MySelf no error', () => (
    <div>
      <MySelf
        message="はじめてまして！引っ越しに伴い2ヶ月ほど荷物を預けたいです。大きめの荷物になりますがよろしくお願いします。3/20〜5/20頃までです！"
        sentAt="2018/03/03 20:10"
        onClickRetry={() => console.log('onClickRetry')}
      />
    </div>
  ))
  .add('MySelf has error', () => (
    <div>
      <MySelf
        message="はじめてまして！引っ越しに伴い2ヶ月ほど荷物を預けたいです。大きめの荷物になりますがよろしくお願いします。3/20〜5/20頃までです！"
        sentAt="2018/03/03 20:10"
        onClickRetry={() => console.log('onClickRetry')}
        error
      />
    </div>
  ))
  .add('Admin', () => (
    <div>
      <Admin
        message="取引成立です！あなたのお支払いが完了しました。荷物の準備を開始しましょう！"
        receivedAt="2018/03/03 20:10"
      />
    </div>
  ))
  .add('Estimate', () => (
    <div>
      <Estimate
        name="YUKI HASHIDA"
        beginAt="2018年03月20日"
        endAt="2018年03月24日"
        price="24,000円"
        paymentLink="#"
        receivedAt="2018/03/02 10:52"
      />
    </div>
  ))
  .add('Photo', () => (
    <div style={{ width: '300px' }}>
      <Photo
        src="http://placehold.jp/500x500.png"
        alt="photo"
        receivedAt="2018/03/02 10:52"
      />
    </div>
  ));
