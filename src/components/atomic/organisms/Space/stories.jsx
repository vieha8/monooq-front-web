// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import Detail from './Detail';
import Price from './Price';

storiesOf('Organisms/Space', module)
  .addDecorator(StoryRouter())
  .add('Detail', () => (
    <div style={{ width: '700px' }}>
      <Detail
        pref="東京都"
        city="杉並区"
        town="高円寺"
        name="テストテストテストテストテストテスト"
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
        description="スペースの説明。これは説明です。"
        address="東京都杉並区高円寺"
        type="物置き"
        aboutBaggage="荷物についてほげほげ"
        delivery
        meeting
        supplement="土日に受けとることが可能です"
        user={{
          id: 0,
          name: 'モノオク太郎',
          imageUrl: 'http://placehold.jp/100x100.png',
          profile: 'はじめまして！モノオク太郎です！よろしくお願いします。',
        }}
      />
    </div>
  ))
  .add('Price', () => (
    <div style={{ width: '300px' }}>
      <Price
        full="50,000"
        half="50,000"
        quarter="50,000"
      />
    </div>
  ));
