// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import TransferList from './index';

TransferList.displayName = 'TransferList';

storiesOf('Organisms(LV3)/TransferList', module)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        送受金情報
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
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
    )),
  )
  .add(
    'Has supplement',
    withInfo(`
        ### コンポーネント概要
        送受金情報(補足有りver)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
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
    )),
  );
