// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Other from './Other';

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
  ));
