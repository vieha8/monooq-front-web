// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Payment from './index';

Payment.displayName = 'Payment';

storiesOf('Molecules/Payment', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      お支払い情報
    `)(() => (
    <div style={{ width: '100%', maxWidth: '380px', padding: `${Dimens.storyBookPadding}` }}>
      <Payment beginAt="2018年03月20日" endAt="2018年05月20日" duration={60} price="32,000" />
    </div>
  )),
);
