// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Other from './Other';
import MySelf from './MySelf';

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
  ));
