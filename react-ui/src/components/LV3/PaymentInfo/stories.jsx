// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PaymentInfo from './index';

storiesOf('Organisms(LV3)/PaymentInfo', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        決済情報
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PaymentInfo
          user={{
            ID: 1,
            Name: 'モノオク太郎',
            ImageUrl: 'http://placehold.jp/500x500.png',
          }}
          hostName="モノオク太郎"
          space={{
            image: {
              src: 'http://placehold.jp/500x500.png',
              alt: '',
            },
            address: '東京都港区六本木',
            content: 'ものおきスペース',
            href: '#',
          }}
          payment={{
            beginAt: '2018/01/01',
            endAt: '2018/03/01',
            duration: '60日間',
            price: '10,000',
          }}
        />
      </div>
    )),
  );
