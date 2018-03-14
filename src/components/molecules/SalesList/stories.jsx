// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import SalesList from './index';

storiesOf('Molecules/SalesList', module)
  .add('Normal', () => (
    <div>
      <SalesList
        sales={[
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
          {
            date: '2018年01月12日',
            status: '処理中',
            price: 12000,
          },
        ]}
      />
    </div>
  ));