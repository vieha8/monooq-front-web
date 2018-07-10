// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import TransferList from './index';

storiesOf('Molecules/TransferList', module)
  .add('Normal', () => (
    <div>
      <TransferList
        transfers={[
          {
            label: 'ホストはYUKI HASHIDAさん',
            date: '2018年01月12日',
            status: '処理中',
            price: 12000,
          },
          {
            date: '2018年01月12日',
            status: '処理中',
            price: 12000,
          },
          {
            date: '2018年01月12日',
            status: '処理中',
            price: 12000,
          },
        ]}
      />
    </div>
  ))
  .add('Has supplement', () => (
    <div>
      <TransferList
        transfers={[
          {
            label: 'ホストはYUKI HASHIDAさん',
            date: '2018年01月12日',
            status: '処理中',
            price: 12000,
          },
          {
            date: '2018年01月12日',
            status: '処理中',
            price: 12000,
          },
          {
            date: '2018年01月12日',
            status: '処理中',
            price: 12000,
          },
        ]}
        supplement={{
          price: 36000,
        }}
      />
    </div>
  ));
