// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import PaymentInfo from './index';

storiesOf('Organisms/PaymentInfo', module)
  .addDecorator(StorybookRouter())
  .add('Normal', () => (
    <div>
      <PaymentInfo
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
  ));
