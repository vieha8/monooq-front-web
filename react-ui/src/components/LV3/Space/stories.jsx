// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SpaceMap from 'components/LV1/SpaceMap';

import Detail from './Detail';
import Price from './Price';
import SendMessage from './SendMessage';

Detail.displayName = 'Detail';
Price.displayName = 'Price';
SendMessage.displayName = 'SendMessage';

storiesOf('Organisms(LV3)/Space', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Detail',
    withInfo(`
        ### コンポーネント概要
        スペース情報(詳細)
      `)(() => (
      <div style={{ width: '580px', padding: `${Dimens.storyBookPadding}` }}>
        <Detail
          pref="東京都"
          city="渋谷区"
          town="渋谷"
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
          map={<SpaceMap lat={35.691638} lng={139.704616} />}
          description="スペースの説明。これは説明です。"
          address="東京都渋谷区渋谷"
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
    )),
  )
  .add(
    'Price',
    withInfo(`
        ### コンポーネント概要
        スペース情報(料金)
      `)(() => (
      <div style={{ width: '580px', padding: `${Dimens.storyBookPadding}` }}>
        <Price full="50,000" half="50,000" quarter="50,000" />
      </div>
    )),
  )
  .add(
    'SendMessage',
    withInfo(`
        ### コンポーネント概要
        スペース情報(相談するボタン)
      `)(() => (
      <div style={{ width: '580px', padding: `${Dimens.storyBookPadding}` }}>
        <SendMessage onClick={() => console.log('onClick')} />
      </div>
    )),
  );
